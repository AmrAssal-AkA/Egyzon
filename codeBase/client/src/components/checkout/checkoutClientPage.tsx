"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  ArrowLeft,
  Trash2,
  ShoppingBag,
  PlusCircle,
  MinusCircle,
  MapPin,
  CreditCard,
  Truck,
  FileText,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { useCartStore } from "@/stores/buyer/useCart";
import { ShippingInfo, ValidationErrors } from "@/types/cart.type";
import { PaymentMethodType } from "@/types/order.types";
import { placeOrder } from "@/services/checkoutService";
import { useAuth } from "@/hooks/useAuth";

export default function CheckoutClientPage() {
  const { cartItems, clearCart, setLastOrder, clearLocalCart } = useCartStore();
  const router = useRouter();
  const { user } = useAuth();

  // State Management
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Egypt",
    phone: "",
  });

  // Automatically autofill user info if logged in
  useEffect(() => {
    if (!user) return;

    const profileAddress = Array.isArray(user.address)
      ? user.address
          .filter((part): part is string => Boolean(part && part.trim()))
          .join(", ")
      : typeof user.address === "string"
        ? user.address
        : "";

    setShippingInfo((prev) => ({
      ...prev,
      firstName: prev.firstName || user.FirstName || "",
      lastName: prev.lastName || user.LastName || "",
      address1: prev.address1 || profileAddress || "",
      phone: prev.phone || user.phoneNumber || "",
    }));
  }, [user]);

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodType>("cashOnDelivery");
  const [orderNotes, setOrderNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Price Calculations (Memoized)
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const shipping = useMemo(() => {
    return subtotal > 0 ? 50 : 0;
  }, [subtotal]);

  const taxes = useMemo(() => {
    return Math.round(subtotal * 0.14);
  }, [subtotal]);

  const discount = useMemo(() => {
    return 0;
  }, []);

  const grandTotal = useMemo(() => {
    return subtotal + shipping + taxes - discount;
  }, [subtotal, shipping, taxes, discount]);

  // Validation Logic
  const validateField = (name: keyof ShippingInfo, value: string): string => {
    const trimmed = value.trim();
    const typeTextRegex = /^[a-zA-Z0-9\s-]+$/;
    switch (name) {
      case "firstName":
        if (!trimmed) return "First name is required.";
        break;
      case "lastName":
        if (!trimmed) return "Last name is required.";
        break;
      case "address1":
        if (!trimmed) return "Address Line 1 is required.";
        if (trimmed.length < 5) return "Address must be at least 5 characters.";
        if (!typeTextRegex.test(trimmed))
          return "Only letters, numbers, spaces, and hyphens are allowed.";
        break;
      case "address2":
        if (trimmed && trimmed.length < 5)
          return "Address Line 2 must be at least 5 characters.";
        if (trimmed && !typeTextRegex.test(trimmed))
          return "Only letters, numbers, spaces, and hyphens are allowed.";
        break;
      case "city":
        if (!trimmed) return "City is required.";
        if (trimmed.length < 2) return "City must be at least 2 characters.";
        if (!typeTextRegex.test(trimmed))
          return "Only letters, numbers, spaces, and hyphens are allowed.";
        break;
      case "state":
        if (!trimmed) return "State / Province is required.";
        if (trimmed.length < 2) return "State must be at least 2 characters.";
        if (!typeTextRegex.test(trimmed))
          return "Only letters, numbers, spaces, and hyphens are allowed.";
        break;
      case "postalCode":
        if (!trimmed) return "Postal / ZIP Code is required.";
        if (trimmed.length < 5)
          return "Postal code must be at least 5 characters.";
        if (!typeTextRegex.test(trimmed))
          return "Only letters, numbers, spaces, and hyphens are allowed.";
        break;
      case "country":
        if (!trimmed) return "Country selection is required.";
        if (trimmed.length < 2) return "Country must be at least 2 characters.";
        if (!typeTextRegex.test(trimmed))
          return "Only letters, numbers, spaces, and hyphens are allowed.";
        break;
      case "phone":
        if (!trimmed) return "Phone number is required.";
        const cleanPhone = trimmed.replace(/[\s-]/g, "");
        if (!/^\+?[1-9]\d{1,14}$/.test(cleanPhone)) {
          return "Invalid phone number format (e.g. +201234567890).";
        }
        break;
      default:
        break;
    }
    return "";
  };

  const isProfilePrefilled = Boolean(user?.isCompleted);

  const handleShippingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof ValidationErrors]) {
      const error = validateField(name as keyof ShippingInfo, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleShippingBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof ShippingInfo, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleConfirmOrder = async () => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Validate all required fields
    (Object.keys(shippingInfo) as Array<keyof ShippingInfo>).forEach((key) => {
      if (key === "address2") return; // address2 is optional
      const err = validateField(key, shippingInfo[key] || "");
      if (err) {
        newErrors[key] = err;
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (!isValid) {
      toast.error("Please fill in all required shipping details correctly.");
      // Scroll to the first invalid field
      const firstErrorField = Object.keys(newErrors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
        }
      }
      return;
    }

    const address2Clean = shippingInfo.address2?.trim();
    const fullShippingAddress = [
      shippingInfo.address1.trim(),
      address2Clean,
      shippingInfo.city.trim(),
      shippingInfo.state.trim(),
      shippingInfo.postalCode.trim(),
      (shippingInfo.country || "Egypt").trim(),
    ]
      .filter(Boolean)
      .join(" - ")
      .replace(/[^a-zA-Z0-9\s-]/g, "");

    if (fullShippingAddress.length < 5) {
      toast.error("Shipping address must be at least 5 characters long.");
      return;
    }

    const cleanNotes = orderNotes.trim()
      ? orderNotes
          .trim()
          .replace(/[^a-zA-Z0-9\s-]/g, "")
          .slice(0, 200)
      : undefined;
    const cleanPhone = shippingInfo.phone.trim().replace(/[\s-]/g, "");

    setIsSubmitting(true);
    try {
      const addressPayload = {
        address1: shippingInfo.address1
          .trim()
          .replace(/[^a-zA-Z0-9\s-]/g, ""),
        address2: address2Clean
          ? address2Clean.replace(/[^a-zA-Z0-9\s-]/g, "")
          : undefined,
        city: shippingInfo.city.trim().replace(/[^a-zA-Z0-9\s-]/g, ""),
        state: shippingInfo.state.trim().replace(/[^a-zA-Z0-9\s-]/g, ""),
        postalCode: shippingInfo.postalCode
          .trim()
          .replace(/[^a-zA-Z0-9\s-]/g, ""),
        country: (shippingInfo.country || "Egypt")
          .trim()
          .replace(/[^a-zA-Z0-9\s-]/g, ""),
      };

      const billingDataPayload = {
        firstName: shippingInfo.firstName.trim(),
        lastName: shippingInfo.lastName.trim(),
        email: user?.email || "customer@egyzon.com",
        phoneNumber: cleanPhone,
        apartment: address2Clean ? address2Clean.replace(/[^a-zA-Z0-9\s-]/g, "") : "N/A",
        floor: "N/A",
        street: shippingInfo.address1.trim().replace(/[^a-zA-Z0-9\s-]/g, ""),
        building: "N/A",
        city: shippingInfo.city.trim().replace(/[^a-zA-Z0-9\s-]/g, ""),
        state: shippingInfo.state.trim().replace(/[^a-zA-Z0-9\s-]/g, ""),
        country: (shippingInfo.country || "Egypt").trim().replace(/[^a-zA-Z0-9\s-]/g, ""),
        postalCode: shippingInfo.postalCode.trim().replace(/[^a-zA-Z0-9\s-]/g, ""),
      };

      const res = await placeOrder({
        Address: addressPayload,
        billingData: billingDataPayload,
        phoneNumber: cleanPhone,
        shippingAddress: fullShippingAddress,
        paymentMethod,
        notes: cleanNotes || undefined,
      });

      const orderData = res.data;
      const paymentLabels: Record<PaymentMethodType, string> = {
        cashOnDelivery: "Cash on Delivery",
        creditCard: "Credit Card",
      };
      const paymentProviders: Record<PaymentMethodType, string> = {
        cashOnDelivery: "Cash Payment",
        creditCard: "Visa / MasterCard",
      };

      setLastOrder({
        orderNumber:
          orderData?.orderNumber ||
          orderData?._id ||
          `EGY-${new Date().getFullYear()}-${Math.floor(
            100000 + Math.random() * 900000,
          )}`,
        orderDate: (orderData?.orderDate || orderData?.createdAt)
          ? new Date(orderData.orderDate || orderData.createdAt!).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : new Date().toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
        orderItems: [...cartItems],
        subtotal: orderData?.subTotal ?? subtotal,
        shipping: orderData?.shippingFee ?? shipping,
        tax: orderData?.taxAmount ?? taxes,
        discount: orderData?.discount ?? discount,
        total: orderData?.totalAmount ?? grandTotal,
        orderStatus: orderData?.orderStatus || "Confirmed",
        delivery: {
          method: "Standard Shipping",
          estimatedDelivery: "3-5 business days",
          trackingAvailable: true,
        },
        payment: {
          type: paymentLabels[paymentMethod] || "Cash on Delivery",
          provider: paymentProviders[paymentMethod] || "Cash Payment",
          last4: paymentMethod === "creditCard" ? "••••" : "COD",
          status: orderData?.paymentStatus === "completed" ? "Paid" : "Pending",
        },
        summary: {
          subtotal: orderData?.subTotal ?? subtotal,
          shipping: orderData?.shippingFee ?? shipping,
          tax: orderData?.taxAmount ?? taxes,
          discount: orderData?.discount ?? discount,
          total: orderData?.totalAmount ?? grandTotal,
          currency: "EGP",
        },
        address: {
          id: "shipping-address",
          fullName: `${shippingInfo.firstName} ${shippingInfo.lastName}`.trim(),
          phone: shippingInfo.phone,
          street: [shippingInfo.address1, shippingInfo.address2]
            .filter(Boolean)
            .join(", "),
          city: shippingInfo.city,
          governorate: shippingInfo.state,
          postalCode: shippingInfo.postalCode,
          country: shippingInfo.country || "Egypt",
        },
      });

      clearLocalCart();
      toast.success("Order placed successfully!");
        router.push("/checkout/confirmation");
      

    } catch (error: any) {
      toast.error(error.message || "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1.");
      return;
    }
    useCartStore.getState().updateQuantity(id, newQuantity);
  };

  return (
    <div className="w-full max-w-7xl flex flex-col gap-8">
      {/* Navigation Back */}
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            Checkout
            <span className="text-sm font-normal text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1.5">
            Review your selected items and proceed to payment.
          </p>
        </div>

        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="inline-flex items-center justify-center gap-2 bg-destructive/10 hover:bg-destructive hover:text-white text-destructive border border-destructive/25 transition-all text-xs font-semibold px-4 py-2.5 rounded-lg active:scale-[0.99] cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            Clear Cart
          </button>
        )}
      </div>

      {/* Content Area */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <ShoppingBag className="w-16 h-16 text-muted-foreground" />
          <p className="text-muted-foreground text-lg">
            Your cart is currently empty.
          </p>
          <Link
            href="/"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Forms and Cart items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Shipping Form */}
            <div className="border border-border rounded-lg p-6 bg-card text-card-foreground shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Shipping Details</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-foreground"
                  >
                    First Name
                    {!isProfilePrefilled && (
                      <span className="text-destructive"> *</span>
                    )}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleShippingChange}
                    onBlur={handleShippingBlur}
                    placeholder={isProfilePrefilled ? "" : "Mohamed"}
                    className={`w-full rounded-xl border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/20 ${
                      errors.firstName
                        ? "border-destructive focus:border-destructive animate-shake"
                        : "border-input focus:border-ring"
                    }`}
                    aria-invalid={!!errors.firstName}
                    aria-describedby={
                      errors.firstName ? "firstName-error" : undefined
                    }
                  />
                  {errors.firstName && (
                    <p
                      id="firstName-error"
                      className="text-xs text-destructive mt-1"
                    >
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-foreground"
                  >
                    Last Name
                    {!isProfilePrefilled && (
                      <span className="text-destructive"> *</span>
                    )}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleShippingChange}
                    onBlur={handleShippingBlur}
                    placeholder={isProfilePrefilled ? "" : "Ali"}
                    className={`w-full rounded-xl border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/20 ${
                      errors.lastName
                        ? "border-destructive focus:border-destructive animate-shake"
                        : "border-input focus:border-ring"
                    }`}
                    aria-invalid={!!errors.lastName}
                    aria-describedby={
                      errors.lastName ? "lastName-error" : undefined
                    }
                  />
                  {errors.lastName && (
                    <p
                      id="lastName-error"
                      className="text-xs text-destructive mt-1"
                    >
                      {errors.lastName}
                    </p>
                  )}
                </div>

                {/* Address Line 1 */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label
                    htmlFor="address1"
                    className="text-sm font-medium text-foreground"
                  >
                    Address Line 1
                    {!isProfilePrefilled && (
                      <span className="text-destructive"> *</span>
                    )}
                  </label>
                  <input
                    type="text"
                    id="address1"
                    name="address1"
                    value={shippingInfo.address1}
                    onChange={handleShippingChange}
                    onBlur={handleShippingBlur}
                    placeholder={
                      isProfilePrefilled ? "" : "123 Main St, Apartment 4B"
                    }
                    className={`w-full rounded-xl border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/20 ${
                      errors.address1
                        ? "border-destructive focus:border-destructive animate-shake"
                        : "border-input focus:border-ring"
                    }`}
                    aria-invalid={!!errors.address1}
                    aria-describedby={
                      errors.address1 ? "address1-error" : undefined
                    }
                  />
                  {errors.address1 && (
                    <p
                      id="address1-error"
                      className="text-xs text-destructive mt-1"
                    >
                      {errors.address1}
                    </p>
                  )}
                </div>

                {/* Address Line 2 */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label
                    htmlFor="address2"
                    className="text-sm font-medium text-foreground"
                  >
                    Address Line 2{" "}
                    <span className="text-muted-foreground font-normal">
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    id="address2"
                    name="address2"
                    value={shippingInfo.address2}
                    onChange={handleShippingChange}
                    placeholder="Suite, Unit, Building (Optional)"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                  />
                </div>

                {/* City */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="city"
                    className="text-sm font-medium text-foreground"
                  >
                    City <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleShippingChange}
                    onBlur={handleShippingBlur}
                    placeholder="Cairo"
                    className={`w-full rounded-xl border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/20 ${
                      errors.city
                        ? "border-destructive focus:border-destructive animate-shake"
                        : "border-input focus:border-ring"
                    }`}
                    aria-invalid={!!errors.city}
                    aria-describedby={errors.city ? "city-error" : undefined}
                  />
                  {errors.city && (
                    <p
                      id="city-error"
                      className="text-xs text-destructive mt-1"
                    >
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* State / Province */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="state"
                    className="text-sm font-medium text-foreground"
                  >
                    State / Province <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleShippingChange}
                    onBlur={handleShippingBlur}
                    placeholder="Giza"
                    className={`w-full rounded-xl border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/20 ${
                      errors.state
                        ? "border-destructive focus:border-destructive animate-shake"
                        : "border-input focus:border-ring"
                    }`}
                    aria-invalid={!!errors.state}
                    aria-describedby={errors.state ? "state-error" : undefined}
                  />
                  {errors.state && (
                    <p
                      id="state-error"
                      className="text-xs text-destructive mt-1"
                    >
                      {errors.state}
                    </p>
                  )}
                </div>

                {/* Postal Code */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="postalCode"
                    className="text-sm font-medium text-foreground"
                  >
                    Postal / ZIP Code{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={handleShippingChange}
                    onBlur={handleShippingBlur}
                    placeholder="12345"
                    className={`w-full rounded-xl border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/20 ${
                      errors.postalCode
                        ? "border-destructive focus:border-destructive animate-shake"
                        : "border-input focus:border-ring"
                    }`}
                    aria-invalid={!!errors.postalCode}
                    aria-describedby={
                      errors.postalCode ? "postalCode-error" : undefined
                    }
                  />
                  {errors.postalCode && (
                    <p
                      id="postalCode-error"
                      className="text-xs text-destructive mt-1"
                    >
                      {errors.postalCode}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-foreground"
                  >
                    Phone Number
                    {!isProfilePrefilled && (
                      <span className="text-destructive"> *</span>
                    )}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleShippingChange}
                    onBlur={handleShippingBlur}
                    placeholder={isProfilePrefilled ? "" : "+20 123 456 7890"}
                    className={`w-full rounded-xl border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/20 ${
                      errors.phone
                        ? "border-destructive focus:border-destructive animate-shake"
                        : "border-input focus:border-ring"
                    }`}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p
                      id="phone-error"
                      className="text-xs text-destructive mt-1"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="border border-border rounded-lg p-6 bg-card text-card-foreground shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Payment Method</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: "cashOnDelivery" as PaymentMethodType,
                    label: "Cash on Delivery",
                    description: "Pay with cash upon delivery",
                    icon: Truck,
                  },
                  {
                    id: "creditCard" as PaymentMethodType,
                    label: "Credit Card",
                    description: "Pay securely with your credit card",
                    icon: CreditCard,
                  },
                ].map((option) => {
                  const Icon = option.icon;
                  const isSelected = paymentMethod === option.id;
                  return (
                    <label
                      key={option.id}
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all hover:bg-muted/50 focus-within:ring-2 focus-within:ring-ring/20 ${
                        isSelected
                          ? "border-primary bg-primary/5 dark:bg-blue-600/5 dark:border-blue-600"
                          : "border-border bg-background"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={option.id}
                        checked={isSelected}
                        onChange={() =>
                          setPaymentMethod(option.id as PaymentMethodType)
                        }
                        className="sr-only"
                      />
                      <Icon
                        className={`w-5 h-5 mt-0.5 ${
                          isSelected
                            ? "text-primary dark:text-blue-500"
                            : "text-muted-foreground"
                        }`}
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-foreground">
                          {option.label}
                        </span>
                        <span className="text-xs text-muted-foreground mt-0.5">
                          {option.description}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Order Notes */}
            <div className="border border-border rounded-lg p-6 bg-card text-card-foreground shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Order Notes</h2>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="orderNotes"
                  className="text-sm font-medium text-foreground"
                >
                  Notes{" "}
                  <span className="text-muted-foreground font-normal">
                    (Optional)
                  </span>
                </label>
                <textarea
                  id="orderNotes"
                  name="orderNotes"
                  value={orderNotes}
                  onChange={(e) => {
                    if (e.target.value.length <= 300) {
                      setOrderNotes(e.target.value);
                    }
                  }}
                  placeholder="Delivery instructions, apartment number, gate code..."
                  className="w-full h-28 rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 resize-none"
                  maxLength={300}
                />
                <div className="flex justify-end text-xs text-muted-foreground mt-1">
                  {orderNotes.length} / 300 characters
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold border-b border-border pb-3 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                Review Items
              </h2>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  {/* Product Thumbnail */}
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-destructive/10 hover:bg-destructive hover:text-white text-destructive border border-destructive/25 transition-all text-xs font-semibold px-2 py-1 rounded-full cursor-pointer">
                      <Trash2
                        onClick={() => {
                          toast.success(
                            `Removed "${item.title}" from your cart.`,
                          );
                          useCartStore.getState().removeFromCart(item.id);
                        }}
                        className="w-4 h-4"
                      />
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col flex-1">
                    <h3 className="font-semibold text-foreground line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-1 mt-1">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-lg font-bold text-foreground">
                        {item.price.toFixed(2)} EGP
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                        >
                          <MinusCircle className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors dark:text-gray-400 dark:hover:text-gray-200" />
                        </button>
                        <span className="text-sm text-muted-foreground dark:text-gray-400">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          <PlusCircle className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors dark:text-gray-400 dark:hover:text-gray-200" />
                        </button>

                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="border border-border rounded-lg p-6 bg-card text-card-foreground shadow-sm flex flex-col gap-4">
            <h2 className="text-xl font-semibold border-b border-border pb-3">
              Order Summary
            </h2>

            <div className="flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-medium text-foreground">
                  {subtotal.toFixed(2)} EGP
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Taxes (14%)</span>
                <span className="font-medium text-foreground">
                  {taxes.toFixed(2)} EGP
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="font-medium text-foreground">
                  {shipping === 0 ? "Free" : `${shipping.toFixed(2)} EGP`}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Discount</span>
                <span className="font-medium text-foreground">
                  {discount === 0 ? "0.00 EGP" : `-${discount.toFixed(2)} EGP`}
                </span>
              </div>
              <div className="border-t border-border my-2 pt-2 flex justify-between font-semibold text-base">
                <span>Grand Total</span>
                <span className="text-foreground">
                  {grandTotal.toFixed(2)} EGP
                </span>
              </div>
            </div>

            <button
              onClick={handleConfirmOrder}
              disabled={isSubmitting || cartItems.length === 0}
              className="w-full mt-2 bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors cursor-pointer text-center flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Placing Order...</span>
                </>
              ) : (
                "Confirm Order"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
