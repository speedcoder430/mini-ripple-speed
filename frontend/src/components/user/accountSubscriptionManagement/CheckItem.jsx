import React from "react";

function CheckItem({ text }) {
    return (
        <div className="flex gap-1.5 items-center mt-3.5 first:mt-0">
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c06bae743dd2016d4378c91948faf415605ae68c?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
                alt="Check mark"
                className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
            />
            <span className="self-stretch my-auto text-slate-900">
                {text}
            </span>
        </div>
    );
}

export default CheckItem;