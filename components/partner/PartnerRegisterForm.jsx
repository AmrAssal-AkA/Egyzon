"use client";
import React from "react";

export default function PartnerRegisterForm() {
  return (
    <form className="w-full  bg-white dark:bg-gray-800 p-8 rounded-lg mx-auto justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="companyName"
          >
            Company/Store Name
          </label>
          <input
            className="border rounded w-full py-1.5 px-1.5 text-gray-700 dark:bg-white dark:text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="companyName"
            type="text"
            placeholder="Company Name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="Owner"
          >
            Owner Name
          </label>
          <input
            className="border rounded w-full py-1.5 px-1.5 text-gray-700 dark:bg-white dark:text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="Owner"
            type="text"
            placeholder="Owner Name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border rounded w-full py-1.5 px-1.5 text-gray-700 dark:bg-white dark:text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            className="border rounded w-full py-1.5 px-1.5 text-gray-700 dark:bg-white dark:text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="text"
            placeholder="Phone"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="contary"
          >
            Contary
          </label>
          <input
            className="border rounded w-full py-1.5 px-1.5 text-gray-700 dark:bg-white dark:text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="contary"
            type="text"
            placeholder="Contary"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            className="border rounded w-full py-1.5 px-1.5 text-gray-700 dark:bg-white dark:text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="Address"
          />
        </div>
        <div className="mb-4">
          <label
            for="TaxID"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Tax ID
          </label>
          <input
            type="text"
            id="TaxID"
            name="TaxID"
            placeholder="Tax ID"
            className="border rounded w-full py-1.5 px-1.5 text-gray-700 dark:bg-white dark:text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          htmlFor="CommercialRegister"
        >
          Commercial Register
        </label>
        <input
          className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 dark:file:bg-yellow-900/30 dark:file:text-yellow-400 dark:hover:file:bg-yellow-900/50"
          id="CommercialRegister"
          type="file"
          placeholder="Commercial Register"
        />
      </div>
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          Register
        </button>
      </div>
    </form>
  );
}
