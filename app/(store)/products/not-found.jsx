"use client";

export default function notFound() {
  return (
    <div className="m-50 bg-white dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl text-center font-bold text-gray-900 dark:text-white">
        Product not found{" "}
      </h1>
      <p className="text-2xl text-center text-gray-700 dark:text-gray-300">
        the terget product you try to view not found!
      </p>
    </div>
  );
}
