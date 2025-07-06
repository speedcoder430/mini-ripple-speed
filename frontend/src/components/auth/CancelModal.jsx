import React from "react";
import { useNavigate } from "react-router-dom";
import SuccessButton from "./SuccessButton";

function CancelModal({ message = "Payment Cancelled" }) {
    const navigate = useNavigate();

    const handleRetry = () => {
        navigate("/dashboard");
    };

    return (
        <section className="flex overflow-hidden flex-col items-center px-12 py-6 rounded shadow-sm bg-neutral-50 w-[402px]">
            <img
                src="https://cdn-icons-png.flaticon.com/512/753/753345.png"
                alt="Cancelled"
                className="object-contain max-w-full aspect-square w-[100px]"
            />
            <h2 className="my-6 text-xl tracking-tight leading-tight text-red-700 font-semibold">
                {message}
            </h2>
            <SuccessButton onClick={handleRetry}>
                Try Again
            </SuccessButton>
        </section>
    );
}

export default CancelModal;
