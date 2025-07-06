import React, { useReducer, useState } from "react";
import InputField from "./InputField";
import SocialLoginButton from "./SocialLoginButton";
import SuccessModal from "./SuccessModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, updateProfile, getIdToken, } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../../../firebase";
// const initialState = {
//     email: "",
//     password: "",
// };

import useSocialLogin from "../../helper/handleSocialLogin"
const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
};


function reducer(state, action) {
    switch (action.type) {
        case "CHANGE":
            return { ...state, [action.name]: action.value };
        case "TOGGLE_TERMS":
            return { ...state, agreedToTerms: !state.agreedToTerms };
        // case "RESET":
        //     return initialState;
        case "RESET":
            return initialState;
        default:
            return state;
    }
}

function SignUpForm() {
    const { handleSocialLogin } = useSocialLogin();
    const [formData, dispatch] = useReducer(reducer, initialState);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "CHANGE", name, value });
    };

    const validateForm = () => {
        const { first_name, last_name, email, address, password, confirmPassword, agreedToTerms } = formData;

        if (!email || !password) {
            toast.error("All fields are required.");
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Invalid email format.");
            return false;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return false;
        }

        if (!agreedToTerms) {
            toast.error("You must agree to the Terms of Service.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            // Step 1: Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password,
            );
            const user = userCredential.user;
            console.log(user);



            const fullName = `${formData.first_name} ${formData.last_name}`;
            await updateProfile(user, { displayName: fullName });

            // Step 3: Get Firebase ID Token
            await user.reload(); // Still good to reload
            const idToken = await user.getIdToken();

            // Step 4: Send ID token to your backend for user creation
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/verify-token`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken }),
            });

            const data = await res.json();
            console.log(data);
            if (res.ok) {
                toast.success("Account created successfully!");
                localStorage.setItem("token", data?.token);
                localStorage.setItem("user", JSON.stringify(data?.user));
                setSignupSuccess(true);
            } else {
                toast.error(data.error || "Signup failed.");
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong.");
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
            "Logged in with Google!"
        );
    };

    return (
        <>
            <ToastContainer />
            {signupSuccess === true ? (
                <div className="flex justify-center items-center min-h-[400px] z-[10]">
                    <SuccessModal message="Account created successfully!" />
                </div>
            ) : (
                <article className="overflow-hidden relative pb-10 mb-0 max-w-full rounded-xl shadow-sm bg-slate-50 w-[903px] max-md:mb-2.5">
                    <header className="flex flex-col justify-center items-center p-6 w-full bg-blue-800 max-md:px-5 max-md:max-w-full">
                        <img
                            src="/landing/logo.png"
                            alt="Logo"
                            className="object-contain max-w-full aspect-[3.88] w-[120px]"
                        />
                    </header>

                    <div className="flex flex-col mt-6 w-full max-md:max-w-full">
                        <h1 className="text-3xl font-bold tracking-tighter leading-tight text-center font-['Amble'] text-slate-900 max-md:max-w-full">
                            Sign Up
                        </h1>
                        <p className="self-center mt-2.5 text-base text-zinc-600 font-['Jost']">
                            Fill the form below to sign up
                        </p>
                    </div>

                    <form
                        className="flex flex-col px-10 mt-6 w-full rounded-lg max-md:px-5 max-md:max-w-full"
                        onSubmit={handleSubmit}
                    >
                        <div className="w-full max-md:max-w-full">
                            <div className="flex flex-wrap gap-6 items-start w-full max-md:max-w-full">
                                <InputField
                                    label="First name"
                                    icon="/auth/auth-1.svg"
                                    placeholder="Enter first name"
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                                <InputField
                                    label="Last name"
                                    icon="/auth/auth-1.svg"
                                    placeholder="Enter last name"
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                />
                            </div>

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
                                <InputField
                                    label="Address"
                                    icon="/auth/auth-3.svg"
                                    placeholder="Enter your address"
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-wrap gap-6 items-start mt-6 w-full max-md:max-w-full">
                                <div className="flex flex-col flex-1 shrink whitespace-nowrap basis-0 h-[86px] min-w-60">
                                    <InputField
                                        label="Password"
                                        icon="/auth/auth-4.svg"
                                        placeholder="Password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        toggleVisibility={() => setShowPassword((prev) => !prev)}
                                    />
                                </div>
                                <div className="flex flex-col flex-1 shrink basis-0 h-[86px] min-w-60">
                                    <InputField
                                        label="Confirm Password"
                                        icon="/auth/auth-4.svg"
                                        placeholder="Confirm Password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        toggleVisibility={() => setShowConfirmPassword((prev) => !prev)}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-6 items-center mt-6 w-full text-sm tracking-tight leading-none text-zinc-600 max-md:max-w-full">
                                <label className="flex gap-2 items-center self-stretch my-auto cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={formData.agreedToTerms}
                                        onChange={() => dispatch({ type: "TOGGLE_TERMS" })}
                                        className="mr-2"
                                    />
                                    <span>Terms of Services</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="gap-2.5 self-stretch px-6 py-3.5 mt-8 w-full text-base font-semibold leading-none whitespace-nowrap rounded-md bg-slate-900 text-neutral-50 max-md:px-5 max-md:max-w-full hover:bg-slate-800 transition-colors"
                        >
                            Submit
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
                                href="/login"
                                className="self-stretch my-auto leading-[112.5%] font-semibold text-[#245bd1] underline"
                            >
                                Login
                            </a>
                        </div>
                    </form>
                </article>
            )}
        </>
    );
}

export default SignUpForm;
