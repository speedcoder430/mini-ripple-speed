import React from "react";

function ProfileDetails() {

    const items = [
        { label: "First name", icon: "/page/userProfile/User.svg", value: "Diala" },
        { label: "Last name", icon: "/page/userProfile/User.svg", value: "Victor" },
        { label: "Email", icon: "/page/userProfile/mail.svg", value: "email@gamil.com" },
        { label: "Phone number", icon: "/admin/profile/call.png", value: "+24 000 000 000" },
    ];

    return (
        <div className="flex flex-col mx-6 rounded-lg max-w-full p-6 border-1 border-gray-50 shadow-sm bg-neutral-50">
            <div className="flex w-full justify-between items-start">
                <span className="flex-1 text-[14px] font-['Amble'] font-semibold py-2">
                    Profile Details
                </span>
                <button className="px-6 py-3 rounded-md bg-[#011732] text-white font-['Jost']">
                    Update Profile
                </button>
            </div>
            <div className="flex w-full justify-start">
                <div className="flex min-w-[150px]">
                    <div className="relative w-[100px] h-[100px] rounded-full shadow-sm mr-6">
                        <img src="/page/userProfile/profile_image.png" alt="admin-profile-image" />
                    </div>
                    <div className="flex flex-col items-start justify-center px-6 border-l-4 border-blue-500 h-[100px] text-[20px]">
                        <p className="font-['Amble'] font-bold leading-8">Victor Diala</p>
                        <p className="font-['Amble'] leading-5">+24 000 000 000</p>
                        <p className="font-['Amble']">email@gamil.com</p>
                    </div>
                </div>
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

export default ProfileDetails;
