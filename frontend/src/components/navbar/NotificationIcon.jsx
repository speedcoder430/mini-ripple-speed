import React from "react";

function NotificationIcon() {
    return (
        <button
            aria-label="Notifications"
            className="flex items-center justify-center"
        >
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac0647933b90a5d62e10fa6e50a47ebf158a82b0?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
                alt="Notification bell"
                className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
            />
        </button>
    );
}

export default NotificationIcon;
