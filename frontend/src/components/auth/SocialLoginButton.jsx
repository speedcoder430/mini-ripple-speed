import React from "react";

function SocialLoginButton({ icon, text, login }) {
    return (
        <button
            onClick={login}
            type="button"
            className="flex gap-3 items-center px-6 py-1.5 whitespace-nowrap rounded-sm border-[1px] border-gray-200 max-md:px-5 hover:bg-gray-100 transition-colors"
        >
            <img
                src={icon}
                alt={`${text} icon`}
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            />
            <span className="self-stretch my-auto">{text}</span>
        </button>
    );
}

export default SocialLoginButton;
