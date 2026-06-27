"use client";
import React, { useState, useRef } from "react";
import { Trash2 } from "lucide-react";

export default function PartnerRegisterForm() {
  const [companyName, setCompanyName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contary, setContary] = useState("");
  const [address, setAddress] = useState("");
  const [TaxID, setTaxID] = useState("");
  const [CommercialRegister, setCommercialRegister] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const conditionsAgrreRef = useRef(null);

  // Handle image preview
  const ImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCommercialRegister(file); // Store the file object
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setCommercialRegister(null);
      setImagePreview(null);
    }
  };

  // Handle file deletion
  const handleDeleteFile = () => {
    setCommercialRegister(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Form validation and submission and error handling
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !companyName ||
      !ownerName ||
      !email ||
      !phone ||
      !contary ||
      !address ||
      !TaxID ||
      !CommercialRegister
    ) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!/^\d{10,15}$/.test(phone)) {
      setError("Please enter a valid phone number (10-15 digits).");
      return;
    }
    if (!/^\d+$/.test(TaxID)) {
      setError("Please enter a valid Tax ID (numbers only).");
      return;
    }
    if (
      CommercialRegister &&
      !["image/jpeg", "image/png", "application/pdf"].includes(
        CommercialRegister.type,
      )
    ) {
      setError("Please upload a valid file (JPEG, PNG, or PDF).");
      return;
    }
    if (!conditionsAgrreRef.current.checked) {
      setError("Please agree to the terms and conditions.");
      return;
    }
    
    setLoading(true);
    setError("");
    try{
      // Simulate form submission (replace with actual API call)
    }catch (error) {
      setError("An error occurred. Please try again later.");
      console.error("Registration error:", error);
    }finally {
      setLoading(false);
      setSuccess("Registration successful!");
      setCompanyName("");
      setOwnerName("");
      setEmail("");
      setPhone("");
      setContary("");
      setAddress("");
      setTaxID("");
      setCommercialRegister(null);
      setImagePreview(null);
    }

  };
  return (
    <form className="w-full  bg-white dark:bg-gray-800 p-8 rounded-lg mx-auto justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="companyName"
          >
            Company/Store Name <span className="text-red-500">*</span>
          </label>
          <input
            className="border rounded w-full py-1.5 px-1.5 text-gray-700 dark:bg-white dark:text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="companyName"
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="Owner"
          >
            Owner Name <span className="text-red-500">*</span>
          </label>
          <input
            className="border rounded w-full py-1.5 px-1.5 text-gray-700 dark:bg-white dark:text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="Owner"
            type="text"
            placeholder="Owner Name"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            className="border rounded w-full py-1.5 px-1.5 text-gray-700 dark:bg-white dark:text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            className="border rounded w-full py-1.5 px-1.5 text-gray-700 dark:bg-white dark:text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="contary"
          >
            Contary <span className="text-red-500">*</span>
          </label>
          <input
            className="border rounded w-full py-1.5 px-1.5 text-gray-700 dark:bg-white dark:text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="contary"
            type="text"
            placeholder="Contary"
            value={contary}
            onChange={(e) => setContary(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address <span className="text-red-500">*</span>
          </label>
          <input
            className="border rounded w-full py-1.5 px-1.5 text-gray-700 dark:bg-white dark:text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="TaxID"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Tax ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="TaxID"
            name="TaxID"
            placeholder="Tax ID"
            className="border rounded w-full py-1.5 px-1.5 text-gray-700 dark:bg-white dark:text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            value={TaxID}
            onChange={(e) => setTaxID(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          htmlFor="CommercialRegister"
        >
          Commercial Register <span className="text-red-500">*</span>
        </label>

        <input
          ref={fileInputRef}
          className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 dark:file:bg-yellow-900/30 dark:file:text-yellow-400 dark:hover:file:bg-yellow-900/50"
          id="CommercialRegister"
          type="file"
          placeholder="Commercial Register"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={ImagePreviewHandler}
        />
                {imagePreview && (
          <div className="relative w-100 h-60 m-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
            <button
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-md hover:shadow-lg transition-all"
              onClick={handleDeleteFile}
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
      <div className="mb-4">
     <input type="checkbox" id="terms" className="mr-2" required  ref={conditionsAgrreRef}/>
        <label htmlFor="terms" className="text-gray-700 dark:text-gray-300 text-sm">
          I agree to the{" "}
          <a href="/terms" className="text-yellow-500 hover:underline">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-yellow-500 hover:underline">
            Privacy Policy
          </a>
          .
        </label>
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
    </form>
  );
}
