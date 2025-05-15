import React from "react";
import Navbar from "@/components/public/Navbar";
import ErrorContent from "@/components/notFound/ErrorContent";

function NotFoundPage() {
    return (
        <>
            <main className="flex flex-col justify-center items-center mx-auto w-full max-w-none h-screen bg-white max-md:max-w-[991px] max-sm:max-w-screen-sm">
                <Navbar />
                <ErrorContent />
            </main>
        </>
    );
}

export default NotFoundPage;
