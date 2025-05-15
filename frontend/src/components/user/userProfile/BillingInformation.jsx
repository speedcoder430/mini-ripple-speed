import React from "react";

function BillingInformation() {

    const items = [
        { label: "Country", icon: "/page/userProfile/country.svg", value: "Nigeria" },
        { label: "State", icon: "/page/userProfile/location.svg", value: "Imo" },
        { label: "Billing Address", icon: "/page/userProfile/Address.svg", value: "3605 Parker Rd." },
        { label: "ZIP Code", icon: "/page/userProfile/zipcode.svg", value: "010000" },
    ];

    return (
        <div className="flex flex-col mx-6 mt-6 rounded-lg max-w-full p-6 border-1 border-gray-50 shadow-sm bg-neutral-50">
            <div className="flex w-full justify-between items-start">
                <span className="flex-1 text-[14px] font-['Amble'] font-semibold py-2">
                    Billing Information
                </span>
                <button className="px-6 py-3 rounded-md bg-[#011732] text-white font-['Jost']">
                    Update Billing Address
                </button>
            </div>
            <div className="flex flex-wrap w-full mt-6">
                {items.map((item) => {
                    return (
                        <div className="flex flex-col items-start w-1/2 pr-6 mb-6">
                            <p className="text-[14px] font-['Amble'] text-gray-700 mb-2">
                                {item.label}
                            </p>
                            <div className="flex items-start justify-start w-full text-[16px] font-['Jost'] px-3 py-4 border-2 border-gray-300 rounded-sm">
                                <img src={item.icon} alt={item.label} />
                                <span className="text-black ml-3">{item.value}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default BillingInformation;
