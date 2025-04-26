import { useState } from "react";
import axios from "../axiosInstance";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "./GoogleLoginButton";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!clientId) {
  console.error("Google Client ID is missing! Please check your .env file.");
}

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegistering) {
        await axios.post("/auth/register", null, {
          params: { username, password },
        });
        alert("Registration successful! You can now log in.");
        setIsRegistering(false);
        setUsername("");
        setPassword("");
      } else {
        const response = await axios.post("/auth/login", null, {
          params: { username, password },
        });
        const { token, userId } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      }
    } catch (error) {
      console.error(isRegistering ? "Registration failed:" : "Login failed:", error);
      if (isRegistering && error.response?.status === 400) {
        alert("Username already exists!");
      } else {
        alert(isRegistering ? "Registration failed!" : "Login failed! Check username/password.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <GoogleOAuthProvider clientId={clientId || "dummy"}>
      <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
        <h2 style={{ textAlign: "center" }}>{isRegistering ? "Sign Up" : "Login"}</h2>
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
            autoComplete={isRegistering ? "new-password" : "current-password"}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <button
            type="submit"
            style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px" }}
            disabled={loading}
          >
            {loading ? "Please wait..." : isRegistering ? "Sign Up" : "Login"}
          </button>
        </form>

        <p style={{ textAlign: "center", margin: "20px 0" }}>
          {isRegistering ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            style={{ marginLeft: "10px", color: "#007bff", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
          >
            {isRegistering ? "Login" : "Sign Up"}
          </button>
        </p>

        <p style={{ textAlign: "center" }}>or</p>

        <GoogleLoginButton onLoginSuccess={onLoginSuccess} />
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
