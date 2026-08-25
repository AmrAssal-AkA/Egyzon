"use client";
import React, {useState} from "react";


import { IoIosSearch } from "react-icons/io";


export default function SearchBarComponent() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Searching for:", searchQuery);
    }
  return (
    <div className="hidden md:flex flex-1 max-w-md lg:max-w-lg items-center">
      <form
        onSubmit={handleSearch}
        className="w-full relative flex items-center"
      >
        <input
          type="text"
          placeholder="Search products, brands, categories..."
          className="w-full pl-4 pr-12 py-2 rounded-full border border-input bg-muted/30 text-foreground placeholder:text-muted-foreground/70 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute right-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center shadow-xs"
        >
          <IoIosSearch className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
