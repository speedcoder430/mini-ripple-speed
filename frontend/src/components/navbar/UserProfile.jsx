import React, { useState } from "react";

function isLikelyImageUrl(url) {
    // Accepts common image domains or data URIs even if no extension
    return typeof url === "string" && (
        url.startsWith("http") || url.startsWith("data:image/")
    );
}

function UserProfile({ avatarSrc, userName, userRole, dropdownIconSrc }) {
    const [imageError, setImageError] = useState(false);
    const showImage = isLikelyImageUrl(avatarSrc) && !imageError;
    const initial = userName?.charAt(0)?.toUpperCase() || "U";

    return (
        <div className="flex gap-3 items-center self-stretch my-auto font-['Amble']">
            {showImage ? (
                <img
                    src={avatarSrc}
                    alt="User avatar"
                    onError={() => setImageError(true)}
                    className="object-cover shrink-0 self-stretch my-auto w-8 h-8 rounded-full"
                />
            ) : (
                <div className="w-8 h-8 flex items-center justify-center bg-slate-600 text-white rounded-full text-sm font-semibold font-['Jost']">
                    {initial}
                </div>
            )}
            <div className="self-stretch my-auto">
                <p className="text-sm tracking-tight leading-none text-neutral-900">
                    {userName}
                </p>
                <p className="text-xs leading-none text-neutral-500">
                    {userRole}
                </p>
            </div>
        </div>
    );
}

export default UserProfile;
