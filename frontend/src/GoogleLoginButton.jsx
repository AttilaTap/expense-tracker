import { GoogleLogin } from "@react-oauth/google";
import axios from "./axiosInstance";

function GoogleLoginButton({ onLoginSuccess }) {
  const handleSuccess = async (credentialResponse) => {
    const credential = credentialResponse?.credential;

    if (!credential) {
      console.error("Google credential missing");
      alert("Google login failed. Please try again.");
      return;
    }

    try {
      const response = await axios.post("/auth/google", { token: credential });

      const jwtToken = response.data.token;
      const userId = response.data.userId;

      localStorage.setItem("token", jwtToken);
      localStorage.setItem("userId", userId);

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google login failed!");
    }
  };

  const handleError = () => {
    console.error("Google login error");
    alert("Google login error!");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
}

export default GoogleLoginButton;
