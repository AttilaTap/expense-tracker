import { useState } from "react";
import axios from "./axiosInstance";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "./GoogleLoginButton";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!clientId) {
    console.error("Google Client ID is missing! Please check your .env file.");
  }

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", null, {
        params: { username, password },
      });

      const { token, userId } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed! Check username/password.");
    }
  }

  return (
    <GoogleOAuthProvider clientId={clientId || "dummy"}>
      <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <button
            type="submit"
            style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px" }}
          >
            Login
          </button>
        </form>

        <p style={{ textAlign: "center", margin: "20px 0" }}>or</p>

        <GoogleLoginButton onLoginSuccess={onLoginSuccess} />
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
