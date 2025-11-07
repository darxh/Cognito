import { useState } from "react";
import "./Auth.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const BACKEND_URL = (
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
  ).replace(/\/+$/, "");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || data.message || "Signup failed");
      }

      setSuccess(true);
      localStorage.setItem("username", username);

      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      {!success ? (
        <>
          <h2>Create Account</h2>
          <form onSubmit={handleSignup} className="auth-form">
            <input
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
            {error && <p className="error">{error}</p>}
          </form>
          <p className="switch-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </>
      ) : (
        <div className="welcome-box">
          <h2>Welcome to Cognito!</h2>
          <p>You’re all set to start exploring AI magic ✨</p>
        </div>
      )}
    </div>
  );
}

export default Signup;
