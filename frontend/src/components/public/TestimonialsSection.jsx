import React, { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
    {
        image: "/landing/testimonial-1.png",
        name: "Mark R.",
        position: "Digital Marketing Manager",
        title: "A Game-Changer for Our Ad Campaigns!",
        testimonial: "MiniRipple helped us reduce click fraud by 80%, saving thousands in wasted ad spend. Our ROI has never been better!",
        showRating: true,
    },
    {
        image: "/landing/testimonial-2.png",
        name: "David M.",
        position: "CTO of CloudSync",
        title: "Best Investment for Our Security!",
        testimonial: "As a SaaS company, we deal with constant bot attacks. MiniRipple's real-time protection is invaluable!",
        showRating: true,
    },
    {
        image: "/landing/testimonial-3.png",
        name: "Sophia L.",
        position: "E-Commerce Store Owner",
        title: "Seamless Protection, Instant Results!",
        testimonial: "Integrating MiniRipple was effortless, and we immediately saw a drop in bot traffic. Our website is finally secure!",
        showRating: true,
    },
    {
        image: "/landing/testimonial-4.png",
        name: "Jessica P.",
        position: "Growth Marketer",
        title: "Finally, an Anti-Fraud Solution That Works!",
        testimonial: "MiniRipple detected fraudulent clicks we didn’t even know existed. Our ad spend is now focused on real customers!",
        showRating: true,
    },
];

const TestimonialsSection = () => {
    const [focusedIndex, setFocusedIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFocusedIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="testimonial" className="flex flex-col items-center w-full mt-32 sm540:mt-96 md:mt-10 max-w-6xl mx-auto">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-medium font-['Jost'] text-yellow-400">
                    Customer Success Stories
                </h3>
                <h2 className="mt-4 text-[24px] md:text-[30px] lg:text-[40px] md:tracking-[-1.5px] lg:tracking-wider text-blue-100 font-['Jost'] md:font-['Amble'] font-semibold md:font-bold lg:font-['Anton'] lg:font-normal">
                    Real Results from Real Businesses
                </h2>
            </div>

            <div className="relative w-[800px] overflow-hidden">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(calc(50% - ${focusedIndex * 600 + 300}px))`, // 600px + 2*24px margin = 648
                    }}
                >
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="w-[600px]">
                            <div
                                className={`transition-all duration-700 ease-in-out ${index === focusedIndex
                                    ? "scale-100 z-20"
                                    : "scale-90 opacity-70 z-10"
                                    }`}
                            >
                                <TestimonialCard {...testimonial} className="w-[600px]" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
