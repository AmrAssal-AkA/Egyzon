"use client";

import { useState } from "react";
import Hero from "./Hero";
import Stats from "./Stats";
import WhyChoose from "./WhyChoose";
import Journey from "./Journey";

import CTA from "./CTA";
import { RegisterAsSellerModal } from "./RegisterAsSeller";

export default function PartnerPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleOpenRegister = () => setIsRegisterOpen(true);
  const handleCloseRegister = () => setIsRegisterOpen(false);

  return (
    <div className="w-full min-h-screen bg-background flex flex-col items-center justify-start mt-30">
      <div className="w-full">
        <Hero onOpenRegister={handleOpenRegister} />
      </div>
      <div className="w-full">
        <Stats />
      </div>
      <div className="w-full">
        <WhyChoose />
      </div>
      <div className="w-full">
        <Journey />
      </div>
      <div className="w-full">
        <CTA onOpenRegister={handleOpenRegister} />
      </div>

      <RegisterAsSellerModal
        isOpen={isRegisterOpen}
        onClose={handleCloseRegister}
      />
    </div>
  );
}

