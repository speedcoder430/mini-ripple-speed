import axios from "axios";

export const redirectToStripeCheckout = async ({ planId, user }) => {
    if (!user) {
        throw new Error("User not authenticated");
    }

    const idToken = await user.getIdToken();

    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/stripe/create-checkout-session`,
        { planId },
        {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );

    // ✅ Redirect to Stripe Checkout
    window.location.href = response.data.url;
};
