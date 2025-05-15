import React from "react";
import Navbar from "../components/public/Navbar";
import HeroSection from "../components/public/HeroSection";
import OverviewSection from "../components/public/OverviewSection";
import HowItWorksSection from "../components/public/HowItWorksSection";
import DemoSection from "../components/public/DemoSection";
import CoreFeaturesSection from "../components/public/CoreFeaturesSection";
import BenefitsSection from "../components/public/BenefitsSection";
import WhyChooseSection from "../components/public/WhyChooseSection";
import TestimonialsSection from "../components/public/TestimonialsSection";
import PricingSection from "../components/public/PricingSection";
import FaqSection from "../components/public/FaqSection";
import Footer from "../components/public/Footer";

const LandingPage = () => {
  return (
    <div className="flex overflow-hidden flex-col items-center justify-start pt-10 sm:px-0 md:px-5 bg-[#011732] relative">
      <Navbar />
      <HeroSection />
      <OverviewSection />
      <HowItWorksSection />
      <DemoSection />
      <CoreFeaturesSection />
      <BenefitsSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <Footer />
    </div>
  );
}

export default LandingPage;
