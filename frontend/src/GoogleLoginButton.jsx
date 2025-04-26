import { GoogleLogin } from "@react-oauth/google";
import axios from "./axiosInstance";

function GoogleLoginButton({ onLoginSuccess }) {
  const handleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    try {
      const response = await axios.post("/auth/google", { token: credential });

      const jwtToken = response.data.token;
      localStorage.setItem("token", jwtToken);

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
