import React from "react";

function BestSeller() {
  return (
    <div className="m-40 text-center bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Best{" "}
        <span className="text-yellow-500 dark:text-yellow-400 text-5xl">
          {" "}
          Seller{" "}
        </span>
      </h1>
      <p className="text-2xl font-medium p-3 text-gray-700 dark:text-gray-300">
        We will anounce soon about{" "}
        <span className="text-yellow-800 dark:text-yellow-400 text-3xl">
          best seller products
        </span>
      </p>
    </div>
  );
}

export default BestSeller;
