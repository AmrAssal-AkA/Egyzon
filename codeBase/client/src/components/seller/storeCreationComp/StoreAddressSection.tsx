"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Search,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Compass,
  X,
  Globe2,
} from "lucide-react";
import { StoreType, AddressSuggestion, StoreValidationErrors } from "@/types/store";

interface StoreAddressSectionProps {
  storeType: StoreType;
  address: string;
  city: string;
  errors: StoreValidationErrors;
  onChangeAddress: (address: string, city: string) => void;
  onBlur?: () => void;
}

const EGYPTIAN_COMMERCIAL_LOCATIONS: AddressSuggestion[] = [
  {
    id: "loc-1",
    name: "Abbas El Akkad St, Nasr City",
    city: "Nasr City",
    governorate: "Cairo",
    postalCode: "11765",
    latitude: 30.0561,
    longitude: 31.3301,
  },
  {
    id: "loc-2",
    name: "90th Street (Road 90), 5th Settlement",
    city: "New Cairo",
    governorate: "Cairo",
    postalCode: "11835",
    latitude: 30.0275,
    longitude: 31.4913,
  },
  {
    id: "loc-3",
    name: "Gameat Al Dewal Al Arabiya, Mohandessin",
    city: "Mohandessin",
    governorate: "Giza",
    postalCode: "12611",
    latitude: 30.0549,
    longitude: 31.2003,
  },
  {
    id: "loc-4",
    name: "El Horreya Avenue, Smouha",
    city: "Smouha",
    governorate: "Alexandria",
    postalCode: "21615",
    latitude: 31.2156,
    longitude: 29.9553,
  },
  {
    id: "loc-5",
    name: "Road 9, Maadi",
    city: "Maadi",
    governorate: "Cairo",
    postalCode: "11728",
    latitude: 29.9592,
    longitude: 31.2632,
  },
  {
    id: "loc-6",
    name: "El Batal Ahmed Abdel Aziz, Dokki",
    city: "Dokki",
    governorate: "Giza",
    postalCode: "12311",
    latitude: 30.0384,
    longitude: 31.2114,
  },
  {
    id: "loc-7",
    name: "Al Ahram St, Korba, Heliopolis",
    city: "Heliopolis",
    governorate: "Cairo",
    postalCode: "11341",
    latitude: 30.0906,
    longitude: 31.3236,
  },
  {
    id: "loc-8",
    name: "El Gezira St, Zamalek",
    city: "Zamalek",
    governorate: "Cairo",
    postalCode: "11211",
    latitude: 30.0617,
    longitude: 31.2197,
  },
  {
    id: "loc-9",
    name: "Central Spine, Sheikh Zayed City",
    city: "Sheikh Zayed",
    governorate: "Giza",
    postalCode: "12588",
    latitude: 30.0534,
    longitude: 30.9632,
  },
  {
    id: "loc-10",
    name: "El Geish St, Mansoura Downtown",
    city: "Mansoura",
    governorate: "Dakahlia",
    postalCode: "35511",
    latitude: 31.0409,
    longitude: 31.3785,
  },
];

export default function StoreAddressSection({
  storeType,
  address,
  city,
  errors,
  onChangeAddress,
  onBlur,
}: StoreAddressSectionProps) {
  const [searchTerm, setSearchTerm] = useState(address);
  const [isOpenSuggestions, setIsOpenSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<AddressSuggestion | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchTerm(address);
    if (address) {
      const match = EGYPTIAN_COMMERCIAL_LOCATIONS.find((loc) =>
        address.toLowerCase().includes(loc.city.toLowerCase()) ||
        address.toLowerCase().includes(loc.name.toLowerCase())
      );
      if (match) {
        setSelectedLocation(match);
      }
    }
  }, [address]);

  // Click outside listener for suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSuggestions = EGYPTIAN_COMMERCIAL_LOCATIONS.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.governorate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectSuggestion = (suggestion: AddressSuggestion) => {
    const formatted = `${suggestion.name}, ${suggestion.city}, ${suggestion.governorate}`;
    setSearchTerm(formatted);
    setSelectedLocation(suggestion);
    onChangeAddress(formatted, suggestion.city);
    setIsOpenSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    setIsOpenSuggestions(true);
    onChangeAddress(val, city || "Cairo");
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedLocation(null);
    onChangeAddress("", "");
  };

  if (storeType === "online") {
    return (
      <div className="bg-slate-50/70 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-5 transition-all">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 shrink-0">
            <Globe2 className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Online-Only Store Selected
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              No customer-facing physical address is required. Your storefront will be displayed as a verified online merchant offering nationwide shipping across all Egyptian governorates.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-5 animate-in fade-in-50 duration-200">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              Physical Store Address
              <span className="text-red-500 font-bold">*</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Where can customers find and visit your store?
            </p>
          </div>
        </div>
      </div>

      {/* Address Search Field with Dropdown */}
      <div ref={dropdownRef} className="space-y-1.5 relative">
        <label
          htmlFor="storeAddress"
          className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between"
        >
          <span>Search or Enter Street Address</span>
          {selectedLocation && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Location Pinpoint Active
            </span>
          )}
        </label>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Search className="w-4 h-4" />
          </div>

          <input
            id="storeAddress"
            type="text"
            placeholder="Search e.g. 90th St New Cairo, Abbas El Akkad Nasr City, Smouha Alexandria..."
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsOpenSuggestions(true)}
            onBlur={onBlur}
            className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm bg-slate-50/50 dark:bg-slate-900/50 transition-all focus:outline-none focus:ring-2 ${
              errors.address
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900 dark:text-red-200"
                : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 focus:border-blue-500 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100"
            }`}
          />

          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {isOpenSuggestions && (
          <div className="absolute left-0 right-0 top-full mt-1 z-30 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 animate-in fade-in-80 duration-150">
            <div className="px-3 py-2 bg-slate-50 dark:bg-slate-850 text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-500" /> Suggested Commercial Hubs
              </span>
              <span>Select to pinpoint</span>
            </div>

            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectSuggestion(item)}
                  className="w-full px-3.5 py-2.5 text-left hover:bg-blue-50/60 dark:hover:bg-blue-950/40 transition-colors flex items-start gap-2.5 cursor-pointer group"
                >
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">
                      {item.city}, {item.governorate} • Postal Code: {item.postalCode || "N/A"}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-slate-500">
                Using custom address: &quot;{searchTerm}&quot;
              </div>
            )}
          </div>
        )}

        {errors.address && (
          <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium pt-0.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.address}</span>
          </p>
        )}
      </div>

      {/* Modern Map Preview Card */}
      <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-850 h-36 flex items-center justify-center">
        {/* Subtle map pattern background */}
        <div className="absolute inset-0 opacity-40 dark:opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Simulated map route lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30 stroke-slate-400 dark:stroke-slate-600" fill="none">
          <path d="M 0 40 Q 150 100 300 20 T 600 80" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 50 120 Q 200 40 400 110 T 800 60" strokeWidth="2" />
        </svg>

        {/* Pinpoint marker */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 animate-bounce">
              <MapPin className="w-4 h-4 fill-white" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-blue-900/30 rounded-full blur-xs" />
          </div>

          <div className="mt-2 px-3 py-1 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 text-[11px] font-semibold text-slate-800 dark:text-slate-200 shadow-sm flex items-center gap-1.5 max-w-[280px] truncate">
            <Compass className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="truncate">
              {address ? address : "Cairo / Egyptian Commercial Zone"}
            </span>
          </div>
        </div>

        <div className="absolute bottom-2 right-2 text-[10px] text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-xs">
          Interactive Egyptian Map Preview
        </div>
      </div>
    </div>
  );
}
