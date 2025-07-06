import { signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useSocialLogin = () => {
  const navigate = useNavigate();

  const handleSocialLogin = async (provider, backendUrl, successMessage) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ idToken }),
      });

      // 🔁 Force refresh
      await user.reload(); // 🚀 This is the key
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(successMessage);
      navigate("/dashboard");
    } catch (error) {
      console.error("Social login error:", error);
      toast.error(error.message || "Login failed");
    }
  };

  return { handleSocialLogin };
};

export default useSocialLogin;
