import React from "react";
import Navbar from "../components/public/Navbar";
import PricingHeroSection from "@/components/public/PricingHeroSection";
import PricingPricingSection from "@/components/public/PricingPricingSection";
import PricingFaqSection from "@/components/public/PricingFaqSection";
import PricingSecuritySection from "@/components/public/PricingSecuritySection";
import PricingFooter from "@/components/public/PricingFooter";

const Pricing = () => {
  return (
    <div className="flex overflow-hidden flex-col items-center justify-start z-[10] pt-10 sm:px-0 md:px-5 bg-[#011732] relative">
      <Navbar />
      <PricingHeroSection />
      <PricingPricingSection />
      <PricingSecuritySection />
      <PricingFaqSection />
      <PricingFooter />
    </div>
  );
}

export default Pricing;
