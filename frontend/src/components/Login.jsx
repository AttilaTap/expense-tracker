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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl text-red-500">Hello Tailwind!</h1>
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">{isRegistering ? "Sign Up" : "Login"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isRegistering ? "new-password" : "current-password"}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
            >
              {loading ? "Please wait..." : isRegistering ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="flex items-center justify-center mt-4">
            <p className="text-sm">
              {isRegistering ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="ml-2 text-blue-500 hover:underline"
              >
                {isRegistering ? "Login" : "Sign Up"}
              </button>
            </p>
          </div>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-400">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex justify-center">
            <GoogleLoginButton onLoginSuccess={onLoginSuccess} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
