import React from "react";
import { useNavigate } from "react-router-dom";
import SuccessButton from "./SuccessButton";

function SuccessModal({ message = "Success!" }) {
    const navigate = useNavigate();

    const handleContinue = () => {
        console.log("Navigating to dashboard");
        navigate("/dashboard");
    };

    return (
        <section className="flex overflow-hidden flex-col items-center px-12 py-6 rounded shadow-sm bg-neutral-50 w-[402px]">
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4e8af1813da4d3676d0abff6073951017066e80?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
                alt="Success checkmark"
                className="object-contain max-w-full aspect-square w-[100px]"
            />
            <h2 className="my-6 text-xl tracking-tight leading-tight text-slate-900">
                {message}
            </h2>
            <SuccessButton onClick={handleContinue}>
                Continue To Dashboard
            </SuccessButton>
        </section>
    );
}

export default SuccessModal;
