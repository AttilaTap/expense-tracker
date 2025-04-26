import { useState } from "react";
import axios from "./axiosInstance";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "./GoogleLoginButton";

const clientId = "876142938622-qf0d3sne0k83vgfempdruk7qhdnsck5r.apps.googleusercontent.com";
function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", null, {
        params: { username, password },
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed! Check username/password.");
    }
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        <p>or</p>

        <GoogleLoginButton onLoginSuccess={onLoginSuccess} />
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
