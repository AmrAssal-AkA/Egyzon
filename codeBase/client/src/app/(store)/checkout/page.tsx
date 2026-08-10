"use client";
import Link from "next/link";
import React, { useState, useMemo } from "react";
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
  Wallet,
  FileText,
} from "lucide-react";
import { useCartStore } from "@/stores/buyer/useCart";
import { toast } from "sonner";

interface ShippingInfo {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

type PaymentMethodType = "card" | "debit" | "cod" | "wallet";

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
}

const COUNTRIES = [
  { code: "", name: "Select Country" },
  { code: "EG", name: "Egypt" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "KW", name: "Kuwait" },
  { code: "QA", name: "Qatar" },
  { code: "BH", name: "Bahrain" },
  { code: "OM", name: "Oman" },
];

function Checkout() {
  const { cartItems, clearCart, confirmOrder } = useCartStore();
  const router = useRouter();

  // State Management
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("card");
  const [orderNotes, setOrderNotes] = useState("");

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
        break;
      case "city":
        if (!trimmed) return "City is required.";
        break;
      case "state":
        if (!trimmed) return "State / Province is required.";
        break;
      case "postalCode":
        if (!trimmed) return "Postal / ZIP Code is required.";
        if (!/^[a-zA-Z0-9\s-]{3,10}$/.test(trimmed)) {
          return "Invalid postal code format (3-10 characters).";
        }
        break;
      case "country":
        if (!trimmed) return "Country selection is required.";
        break;
      case "phone":
        if (!trimmed) return "Phone number is required.";
        if (!/^\+?[0-9\s\-()]{7,15}$/.test(trimmed)) {
          return "Invalid phone number format (7-15 digits).";
        }
        break;
      default:
        break;
    }
    return "";
  };

  const handleShippingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof ShippingInfo, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleConfirmOrder = () => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Validate all required fields
    (Object.keys(shippingInfo) as Array<keyof ShippingInfo>).forEach((key) => {
      if (key === "address2") return; // address2 is optional
      const err = validateField(key, shippingInfo[key]);
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

    // Process confirm order
    confirmOrder();

    // Update lastOrder details in cart store for confirmation page layout integration
    const state = useCartStore.getState();
    if (state.lastOrder) {
      const paymentLabels: Record<PaymentMethodType, string> = {
        card: "Credit Card",
        debit: "Debit Card",
        cod: "Cash on Delivery",
        wallet: "Digital Wallet",
      };
      const paymentProviders: Record<PaymentMethodType, string> = {
        card: "Visa/MasterCard",
        debit: "Visa/MasterCard",
        cod: "Cash Payment",
        wallet: "Apple/Google Pay",
      };

      useCartStore.setState({
        lastOrder: {
          ...state.lastOrder,
          summary: {
            subtotal,
            shipping,
            tax: taxes,
            discount,
            total: grandTotal,
            currency: "EGP",
          },
          payment: {
            type: paymentLabels[paymentMethod],
            provider: paymentProviders[paymentMethod],
            last4: paymentMethod === "card" || paymentMethod === "debit" ? "4242" : "COD",
            status: "Paid",
          },
        },
      });
    }

    toast.success("Order confirmed successfully!");
    router.push("/checkout/confirmation");
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1.");
      return;
    }
    useCartStore.getState().updateQuantity(id, newQuantity);
  };

  return (
    <main className="w-full min-h-screen bg-background flex flex-col items-center py-20 px-4 md:px-20 mt-30">
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
                    <label htmlFor="firstName" className="text-sm font-medium text-foreground">
                      First Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      onBlur={handleShippingBlur}
                      placeholder="Mohamed"
                      className={`w-full rounded-xl border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/20 ${
                        errors.firstName ? "border-destructive focus:border-destructive animate-shake" : "border-input focus:border-ring"
                      }`}
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    />
                    {errors.firstName && (
                      <p id="firstName-error" className="text-xs text-destructive mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="lastName" className="text-sm font-medium text-foreground">
                      Last Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      onBlur={handleShippingBlur}
                      placeholder="Ali"
                      className={`w-full rounded-xl border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/20 ${
                        errors.lastName ? "border-destructive focus:border-destructive animate-shake" : "border-input focus:border-ring"
                      }`}
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    />
                    {errors.lastName && (
                      <p id="lastName-error" className="text-xs text-destructive mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  {/* Address Line 1 */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label htmlFor="address1" className="text-sm font-medium text-foreground">
                      Address Line 1 <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="address1"
                      name="address1"
                      value={shippingInfo.address1}
                      onChange={handleShippingChange}
                      onBlur={handleShippingBlur}
                      placeholder="123 Main St, Apartment 4B"
                      className={`w-full rounded-xl border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/20 ${
                        errors.address1 ? "border-destructive focus:border-destructive animate-shake" : "border-input focus:border-ring"
                      }`}
                      aria-invalid={!!errors.address1}
                      aria-describedby={errors.address1 ? "address1-error" : undefined}
                    />
                    {errors.address1 && (
                      <p id="address1-error" className="text-xs text-destructive mt-1">
                        {errors.address1}
                      </p>
                    )}
                  </div>

                  {/* Address Line 2 */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label htmlFor="address2" className="text-sm font-medium text-foreground">
                      Address Line 2 <span className="text-muted-foreground font-normal">(Optional)</span>
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
                    <label htmlFor="city" className="text-sm font-medium text-foreground">
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
                        errors.city ? "border-destructive focus:border-destructive animate-shake" : "border-input focus:border-ring"
                      }`}
                      aria-invalid={!!errors.city}
                      aria-describedby={errors.city ? "city-error" : undefined}
                    />
                    {errors.city && (
                      <p id="city-error" className="text-xs text-destructive mt-1">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  {/* State / Province */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="state" className="text-sm font-medium text-foreground">
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
                        errors.state ? "border-destructive focus:border-destructive animate-shake" : "border-input focus:border-ring"
                      }`}
                      aria-invalid={!!errors.state}
                      aria-describedby={errors.state ? "state-error" : undefined}
                    />
                    {errors.state && (
                      <p id="state-error" className="text-xs text-destructive mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>

                  {/* Postal Code */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="postalCode" className="text-sm font-medium text-foreground">
                      Postal / ZIP Code <span className="text-destructive">*</span>
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
                        errors.postalCode ? "border-destructive focus:border-destructive animate-shake" : "border-input focus:border-ring"
                      }`}
                      aria-invalid={!!errors.postalCode}
                      aria-describedby={errors.postalCode ? "postalCode-error" : undefined}
                    />
                    {errors.postalCode && (
                      <p id="postalCode-error" className="text-xs text-destructive mt-1">
                        {errors.postalCode}
                      </p>
                    )}
                  </div>

                  {/* Country Selection */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="country" className="text-sm font-medium text-foreground">
                      Country <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingChange}
                      onBlur={handleShippingBlur}
                      className={`w-full rounded-xl border bg-background px-4 py-3 text-foreground outline-none transition focus:ring-2 focus:ring-ring/20 ${
                        errors.country ? "border-destructive focus:border-destructive" : "border-input focus:border-ring"
                      }`}
                      aria-invalid={!!errors.country}
                      aria-describedby={errors.country ? "country-error" : undefined}
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <p id="country-error" className="text-xs text-destructive mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      Phone Number <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      onBlur={handleShippingBlur}
                      placeholder="+20 123 456 7890"
                      className={`w-full rounded-xl border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/20 ${
                        errors.phone ? "border-destructive focus:border-destructive animate-shake" : "border-input focus:border-ring"
                      }`}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-xs text-destructive mt-1">
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
                      id: "card",
                      label: "Credit Card",
                      description: "Pay securely with your credit card",
                      icon: CreditCard,
                    },
                    {
                      id: "debit",
                      label: "Debit Card",
                      description: "Pay with your debit card",
                      icon: CreditCard,
                    },
                    {
                      id: "cod",
                      label: "Cash on Delivery",
                      description: "Pay with cash upon delivery",
                      icon: Truck,
                    },
                    {
                      id: "wallet",
                      label: "Digital Wallet",
                      description: "Apple Pay, Google Pay, or other wallets",
                      icon: Wallet,
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
                          onChange={() => setPaymentMethod(option.id as PaymentMethodType)}
                          className="sr-only"
                        />
                        <Icon
                          className={`w-5 h-5 mt-0.5 ${
                            isSelected ? "text-primary dark:text-blue-500" : "text-muted-foreground"
                          }`}
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm text-foreground">{option.label}</span>
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
                  <label htmlFor="orderNotes" className="text-sm font-medium text-foreground">
                    Notes <span className="text-muted-foreground font-normal">(Optional)</span>
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
                              `Removed "${item.title}" from your cart.`
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
                className="w-full mt-2 bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors cursor-pointer text-center"
              >
                Confirm Order
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Checkout;
