import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import SocialLoginButton from "./SocialLoginButton";
import SuccessModal from "./SuccessModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirectToStripeCheckout } from "../../helper/useStripeCheckout"

import { auth, googleProvider, facebookProvider } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useSocialLogin from "../../helper/handleSocialLogin"

function SignInForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        // provider: "local",
        // provider_id: "",
    });

    const { handleSocialLogin } = useSocialLogin();
    const [showPassword, setShowPassword] = useState(false);
    const [stayLoggedIn, setStayLoggedIn] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const { email, password } = formData;

        if (!email || !password) {
            toast.error("All fields are required.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Invalid email format.");
            return false;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return false;
        }

        return true;
    };

    // SignIn.jsx
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            // Firebase login
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            // Get Firebase ID token
            const idToken = await user.getIdToken();
            console.log("Firebase ID Token:", idToken);

            // Send token to backend
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v1/users/verify-token`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idToken }),
                }
            );

            const data = await res.json();
            console.log("Backend response:", data);

            if (!res.ok) {
                toast.error(data.error || "Login failed.");
                return;
            }

            toast.success("Logged in successfully!");
            localStorage.setItem("token", data.token);
            setIsLoggedIn(true);

            // ✅ Check for saved planId
            const selectedPlanId = localStorage.getItem("selectedPlanId");

            if (selectedPlanId) {
                console.log("🔥 Redirecting to checkout with plan:", selectedPlanId);
                await redirectToStripeCheckout({ planId: selectedPlanId, user });
                localStorage.removeItem("selectedPlanId");
                return;
            }

            // 🟢 Only go to dashboard if no checkout is needed
            navigate("/dashboard");

        } catch (error) {
            toast.error(error.message || "Something went wrong. Please try again.");
        }
    };
    const handleSignInwithGoogle = async () => {
        handleSocialLogin(
            googleProvider,
            `${import.meta.env.VITE_API_URL}/api/v1/users/google`,
            "Logged in with Google!"
        );
    };


    const handleFacebookLogin = async () => {
        handleSocialLogin(
            facebookProvider,
            `${import.meta.env.VITE_API_URL}/api/v1/users/facebook`,
            "Logged in with Facebook!"
        );
    };


    return (
        <>
            <ToastContainer />
            {isLoggedIn === true ? (
                <div className="flex justify-center items-center min-h-[400px] z-[10]">
                    <SuccessModal message="Signed in successfully!" />
                </div>
            ) : (
                <article className="overflow-hidden relative pb-10 mb-0 rounded-xl shadow-sm bg-slate-50 max-w-[576px] max-md:mb-2.5">
                    <header className="flex flex-col justify-center items-center p-6 w-full bg-blue-800 max-md:px-5 max-md:max-w-full">
                        <img
                            src="/landing/logo.png"
                            alt="Logo"
                            className="object-contain max-w-full aspect-[3.88] w-[120px]"
                        />
                    </header>

                    <div className="flex flex-col mt-6 w-full max-md:max-w-full">
                        <h1 className="text-3xl font-bold tracking-tighter leading-tight text-center font-['Amble'] text-slate-900 max-md:max-w-full">
                            Log In to Your Dashboard
                        </h1>
                        <p className="self-center mt-2.5 text-base text-zinc-600 font-['Jost']">
                            Enter your login details below to continue
                        </p>
                    </div>

                    <form
                        className="flex flex-col px-10 mt-6 w-full rounded-lg max-md:px-5 max-md:max-w-full"
                        onSubmit={handleSubmit}
                    >
                        <div className="w-full max-md:max-w-full">
                            <div className="flex flex-wrap gap-6 items-start mt-6 w-full max-md:max-w-full">
                                <InputField
                                    label="Email"
                                    icon="/auth/auth-2.svg"
                                    placeholder="Enter your email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-wrap gap-6 items-start mt-6 w-full max-md:max-w-full">
                                <div className="flex flex-col flex-1 shrink whitespace-nowrap basis-0 h-[86px] min-w-60">
                                    <label htmlFor="password" className="gap-2.5 self-start py-0.5 text-sm tracking-tight leading-none text-zinc-600">
                                        Password
                                    </label>
                                    <div className="flex gap-10 justify-between items-center px-3 py-1 mt-2 w-full text-base rounded text-slate-900 border border-gray-200">
                                        <div className="flex gap-2 items-center self-stretch my-auto w-full">
                                            <img
                                                src="/auth/auth-4.svg"
                                                alt="Password icon"
                                                className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                                            />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"  // <-- Add this line
                                                id="password"
                                                className="py-4 px-2 flex-1 bg-slate-50 focus:outline-none focus:border-none focus:ring-0"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Password"
                                                aria-label="Password"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <img
                                                src="/auth/auth-5.svg"
                                                alt="toggle"
                                                className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-6 items-center mt-6 w-full text-sm tracking-tight leading-none text-zinc-600 max-md:max-w-full">
                                <label className="flex gap-2 items-center self-stretch my-auto cursor-pointer">
                                    <input
                                        id="stayLoggedIn"
                                        type="checkbox"
                                        checked={stayLoggedIn}
                                        onChange={() => setStayLoggedIn(prev => !prev)}
                                        className="mr-2"
                                    />
                                    <label htmlFor="stayLoggedIn" className="cursor-pointer">Keep me logged in</label>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="gap-2.5 self-stretch px-6 py-3.5 mt-8 w-full text-base font-semibold leading-none whitespace-nowrap rounded-md bg-slate-900 text-neutral-50 max-md:px-5 max-md:max-w-full hover:bg-slate-800 transition-colors"
                        >
                            Login
                        </button>

                        <div className="flex gap-6 justify-center items-center mt-8 w-full text-base whitespace-nowrap text-slate-400 max-md:max-w-full">
                            <img
                                src="/auth/auth-7.svg"
                                alt="Divider"
                                className="object-contain flex-1 shrink self-stretch my-auto w-full aspect-[333.33] basis-0 min-w-60 stroke-[1px] stroke-neutral-300"
                            />
                            <span className="self-stretch my-auto">or</span>
                            <img
                                src="/auth/auth-7.svg"
                                alt="Divider"
                                className="object-contain flex-1 shrink self-stretch my-auto w-full aspect-[333.33] basis-0 min-w-60 stroke-[1px] stroke-neutral-300"
                            />
                        </div>

                        <div className="flex flex-wrap gap-6 items-start self-center mt-8 text-base text-zinc-600 max-md:max-w-full">
                            <SocialLoginButton login={() => handleSignInwithGoogle()} icon="/auth/auth-8.svg" text="Google" />
                            <SocialLoginButton login={() => handleFacebookLogin()} icon="/auth/auth-9.svg" text="Facebook" />
                            <SocialLoginButton icon="/auth/auth-10.svg" text="X (Twitter)" />

                        </div>

                        <div className="flex flex-wrap gap-1 justify-center items-center mt-8 w-full text-base max-md:max-w-full">
                            <p className="self-stretch my-auto text-zinc-600">
                                Already have an account?
                            </p>
                            <a
                                href="/register"
                                className="self-stretch my-auto leading-[112.5%] font-semibold text-[#245bd1] underline"
                            >
                                Sign Up
                            </a>
                        </div>
                    </form>
                </article>
            )}
        </>
    );
}

export default SignInForm;
