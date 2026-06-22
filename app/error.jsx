"use client";

import React from "react";

export default function error() {
  return (
    <div className="m-50 bg-white dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl text-center font-bold text-gray-900 dark:text-white">
        An Error Accoured
      </h1>
      <p className="text-xl text-center text-gray-700 dark:text-gray-300">
        we sorry some error accured while a open the page pleaser try again
      </p>
    </div>
  );
}
