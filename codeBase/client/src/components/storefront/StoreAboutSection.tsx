"use client";

import React from "react";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Clock,
  MapPin,
  Mail,
  Phone,
  Store as StoreIcon,
  Globe,
  Award,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { StorefrontDetails } from "@/types/storefront";

interface StoreAboutSectionProps {
  store: StorefrontDetails;
}

export default function StoreAboutSection({ store }: StoreAboutSectionProps) {
  const isPhysical = store.storeType === "physical";

  const renderBadgeIcon = (iconType: string) => {
    switch (iconType) {
      case "truck":
        return <Truck className="w-5 h-5" />;
      case "rotate-ccw":
        return <RotateCcw className="w-5 h-5" />;
      case "clock":
        return <Clock className="w-5 h-5" />;
      case "award":
        return <Award className="w-5 h-5" />;
      case "badge-check":
        return <CheckCircle2 className="w-5 h-5" />;
      case "shield":
      default:
        return <ShieldCheck className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
          About {store.name}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Learn more about this seller&apos;s story, services, and location
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left 2 Columns: Bio & Policies */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Story Card */}
          <div className="bg-card p-5 sm:p-7 rounded-2xl border border-border/80 shadow-xs space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
              <span>Our Story</span>
            </h3>
            <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-xs sm:text-sm space-y-3">
              <p>{store.aboutStory || store.description}</p>
              {store.tagline && (
                <blockquote className="border-l-2 border-primary pl-4 py-1 italic font-medium text-foreground text-xs sm:text-sm">
                  &ldquo;{store.tagline}&rdquo;
                </blockquote>
              )}
            </div>
          </div>

          {/* Trust & Guarantee Badges */}
          {store.badges && store.badges.length > 0 && (
            <div className="bg-card p-5 sm:p-7 rounded-2xl border border-border/80 shadow-xs space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                Seller Commitments
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {store.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/50"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                      {renderBadgeIcon(badge.icon)}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-foreground">
                        {badge.label}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-snug">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Physical Location / Online Credentials & Contact */}
        <div className="space-y-6">
          {/* Location / Operational Info */}
          <div className="bg-card p-5 sm:p-6 rounded-2xl border border-border/80 shadow-xs space-y-4">
            <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
              {isPhysical ? (
                <>
                  <StoreIcon className="w-4 h-4 text-primary" />
                  <span>Physical Store Location</span>
                </>
              ) : (
                <>
                  <Globe className="w-4 h-4 text-emerald-500" />
                  <span>Online Store Details</span>
                </>
              )}
            </h3>

            {isPhysical && store.address ? (
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">
                      {store.address.street}
                    </p>
                    <p>
                      {store.address.city}, {store.address.governorate}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {store.address.country || "Egypt"}
                      {store.address.postalCode
                        ? ` · ${store.address.postalCode}`
                        : ""}
                    </p>
                  </div>
                </div>

                {/* Map Preview Placeholder */}
                <div className="relative w-full h-36 rounded-xl overflow-hidden bg-muted border border-border/60 flex flex-col items-center justify-center text-center p-3">
                  <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center mb-2 shadow-xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    {store.address.city}, {store.address.governorate}
                  </span>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${store.address.street || ""}, ${store.address.city}, Egypt`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-[11px] font-semibold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Opening Hours */}
                {store.openingHours && store.openingHours.length > 0 && (
                  <div className="pt-2 border-t border-border/60 space-y-1.5">
                    <span className="text-xs font-bold text-foreground block">
                      Working Hours
                    </span>
                    {store.openingHours.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-xs text-muted-foreground"
                      >
                        <span>{h.days}</span>
                        <span className="font-medium text-foreground">
                          {h.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                <div className="p-3.5 rounded-xl bg-muted/40 border border-border/40 space-y-1.5">
                  <p className="font-semibold text-foreground">
                    Direct Fulfilled Online Store
                  </p>
                  <p className="text-xs">
                    Ships across all Egyptian governorates with tracking and
                    doorstep cash on delivery / credit card processing.
                  </p>
                </div>
                <div className="flex items-center justify-between py-1 text-xs">
                  <span>Shipping Coverage:</span>
                  <strong className="text-foreground">All Egypt (27 Governorates)</strong>
                </div>
                <div className="flex items-center justify-between py-1 text-xs">
                  <span>Average Dispatch:</span>
                  <strong className="text-foreground">Same Day / 24 Hours</strong>
                </div>
              </div>
            )}
          </div>

          {/* Contact & Support Card */}
          <div className="bg-card p-5 sm:p-6 rounded-2xl border border-border/80 shadow-xs space-y-3.5">
            <h3 className="text-sm sm:text-base font-bold text-foreground">
              Contact Vendor
            </h3>

            <div className="space-y-2.5 text-xs sm:text-sm">
              {store.email && (
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a
                    href={`mailto:${store.email}`}
                    className="hover:text-primary transition-colors truncate"
                  >
                    {store.email}
                  </a>
                </div>
              )}

              {store.phone && (
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                  <a
                    href={`tel:${store.phone}`}
                    className="hover:text-primary transition-colors"
                  >
                    {store.phone}
                  </a>
                </div>
              )}

              <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                <span>Member Since:</span>
                <span className="font-semibold text-foreground">
                  {store.joinedDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
