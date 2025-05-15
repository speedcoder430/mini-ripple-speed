import React from "react";

function FormInput({ icon, placeholder }) {
    return (
        <label className="flex items-center px-3 py-5 mb-6 w-full rounded border-solid border-[1.5px] border-neutral-300 max-w-[598px]">
            <div>{icon}</div>
            <input
                type="text"
                placeholder={placeholder}
                className="bg-transparent text-base text-neutral-300 max-md:text-base max-sm:text-sm w-full outline-none"
            />
        </label>
    );
}

export default FormInput;
