import React from "react";

const TestimonialCard = ({
    image,
    name,
    position,
    title,
    testimonial,
    showRating = false,
    className = "",
}) => {
    return (
        <div
            className={`flex flex-col self-stretch scale-[65%] md:scale-100 px-9 py-5 my-auto rounded-xl border-solid shadow-sm border-[1.239px] border-[#3978D7] min-w-60 ${className}`}
        >
            <img
                src={image}
                className="object-contain self-center rounded-full shadow-sm aspect-square w-[82.572px] border-[1.27px] border-[#3978D7]"
                alt={name}
            />
            <div className="flex flex-col mt-7 w-full max-md:max-w-full">
                <div className="flex flex-col self-center max-w-full text-xl tracking-tight leading-tight text-center text-neutral-50 font-['Jost'] w-[159px]">
                    <div className="font-bold text-[12.703px]">{name}</div>
                    <div className="self-center text-[12.703px] font-['Amble']">{position}</div>
                </div>
                <h3 className="mt-4 text-2xl font-semibold leading-none text-center text-blue-200 text-[15.244px] font-['Jost'] max-md:max-w-full">
                    {title}
                </h3>
                <p className="mt-4 text-[12.703px] font-['Amble'] tracking-tight leading-tight text-center text-slate-50 max-md:max-w-full">
                    {testimonial}
                </p>
                {showRating && (
                    <div className="flex gap-2 justify-center items-center self-center mt-4">
                        <img
                            src="/landing/testimonialcard-1.svg"
                            className="object-contain shrink-0 self-stretch my-auto aspect-[1.06] w-[17px]"
                            alt="Star"
                        />
                        <img
                            src="/landing/testimonialcard-2.svg"
                            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[25px]"
                            alt="Star"
                        />
                        <img
                            src="/landing/testimonialcard-3.svg"
                            className="object-contain shrink-0 self-stretch my-auto aspect-[1.03] w-[34px]"
                            alt="Star"
                        />
                        <img
                            src="/landing/testimonialcard-2.svg"
                            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[25px]"
                            alt="Star"
                        />
                        <img
                            src="/landing/testimonialcard-1.svg"
                            className="object-contain shrink-0 self-stretch my-auto aspect-[1.06] w-[17px]"
                            alt="Star"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestimonialCard;
