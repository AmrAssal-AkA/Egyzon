import React from "react";

export default function Deals() {
  return (
    <div className="m-40 text-center bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        explore some{" "}
        <span className="text-yellow-500 dark:text-yellow-400 text-5xl">
          {" "}
          Hot Deals &#128293;{" "}
        </span>
      </h1>
      <p className="text-2xl font-medium p-3 text-gray-700 dark:text-gray-300">
        Hot deals coming soon
      </p>
    </div>
  );
}
