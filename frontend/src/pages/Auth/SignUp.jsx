import SignUpForm from "@/components/auth/SignUpForm";
import React from "react";

function SignUp() {
  return (
    <section className="overflow-hidden bg-blue-500 md:h-svh flex items-center justify-center">
      <div className="flex relative flex-col justify-center items-center px-20 py-36 w-full min-h-[1140px] max-md:px-5 max-md:py-24 max-md:max-w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ff30c4db62b30652d69df46d41db4e7c3363433?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
          alt="Background"
          className="object-cover absolute inset-0 size-full"
        />
        <SignUpForm />
      </div>
    </section>
  );
}

export default SignUp;
