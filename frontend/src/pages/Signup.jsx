import { useState } from "react";
import "../styles/Auth.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const BACKEND_URL = (
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
  ).replace(/\/+$/, "");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {!success ? (
        <>
          <div className="hero-section">
            <h1 className="hero-title">Get Started</h1>
            <p className="hero-subtitle">
              Create your account to explore AI magic ✨
            </p>
          </div>

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

            <button type="submit" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            {error && <p className="error">{error}</p>}
          </form>

          <p className="switch-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </>
      ) : (
        <div className="welcome-box">
          <div className="hero-section">
            <h1 className="hero-title">Welcome to Cognito!</h1>
            <p className="hero-subtitle">You’re all set.</p>
          </div>
        </div>
      )}
    </div>
  );

  // ... export ...
}

export default Signup;
