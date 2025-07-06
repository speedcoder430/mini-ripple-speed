import React from "react";

function ManagementCard({
    nextPaymentDate,
    buttonText,
    imageUrl,
    isExpiring,
    onButtonClick,
    hasPlan
}) {
    return (
        <article
            className="flex gap-10 justify-between items-center p-6 text-base rounded-lg shadow-sm min-w-60 w-5/12 h-[190px] max-md:px-5 max-md:max-w-full"
            style={{ background: "linear-gradient(90deg, #FAFAFA 0%, #00247D 100%)" }}
        >
            <img
                src={imageUrl}
                alt="Payment illustration"
                className="object-contain shrink-0 self-stretch my-auto aspect-square w-[110px]"
            />

            {hasPlan ? (
                <div className="flex flex-col items-end self-stretch my-auto">
                    <div className="w-32 max-w-full text-right">
                        <h3 className="font-semibold leading-none text-neutral-50">
                            Next payment
                        </h3>
                        <p className="mt-3 text-blue-200">on {nextPaymentDate}</p>
                    </div>

                    <button
                        className={`gap-2.5 self-stretch px-6 py-3.5 mt-6 font-semibold leading-none rounded-md text-neutral-50 max-md:px-5 ${
                            isExpiring
                                ? "bg-blue-700 cursor-pointer"
                                : "bg-blue-400 cursor-not-allowed"
                        }`}
                        disabled={!isExpiring}
                        onClick={onButtonClick}
                    >
                        {buttonText}
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-end self-stretch my-auto">
                    {/* Empty space for layout consistency */}
                </div>
            )}
        </article>
    );
}

export default ManagementCard;
