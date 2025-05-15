import React from "react";
import Navbar from "../components/public/Navbar";
import SupportHeroSection from "@/components/public/SupportHeroSection";
import SupportInfoSection from "@/components/public/SupportInfoSection";
import SupportCategoriesSection from "@/components/public/SupportCategoriesSection";
import SupportRequestSection from "@/components/public/SupportRequestSection";
import SupportContactForm from "@/components/public/SupportContactForm";
import SupportResourcesSection from "@/components/public/SupportResourcesSection";
import SupportFooter from "@/components/public/SupportFooter";

const Support = () => {
  return (
    <div className="flex overflow-hidden flex-col items-center w-full justify-start z-[10] pt-10 sm:px-0 md:px-5 bg-[#011732] relative">
      <Navbar />
      <SupportHeroSection />
      <SupportInfoSection />
      <SupportCategoriesSection />
      <SupportRequestSection />
      <SupportContactForm />
      <SupportResourcesSection />
      <SupportFooter />
    </div>
  );
}

export default Support;
