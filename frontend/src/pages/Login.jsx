// import { useState } from "react";
// import "../styles/Auth.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || "http://localhost:8080").replace(/\/+$/, "");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await fetch(`${BACKEND_URL}/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       // Parse response safely
//       const data = await res.json().catch(() => ({}));

//       if (!res.ok) {
//         throw new Error(data.error || data.message || "Login failed");
//       }
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("username", data.username || "User");

//       window.location.href = "/";
//     } catch (err) {
//       console.error("Login error:", err);
//       setError(err.message || "Login failed");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Welcome Back</h2>
//       <form onSubmit={handleLogin} className="auth-form">
//         <input
//           type="email"
//           placeholder="Email address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//         {error && <p className="error">{error}</p>}
//       </form>
//       <p className="switch-text">
//         Don’t have an account? <a href="/signup">Sign Up</a>
//       </p>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import "../styles/Auth.css";

function Login() {
  // ... keep your existing state and logic ...
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || "http://localhost:8080").replace(/\/+$/, "");

  const handleLogin = async (e) => {
      // ... keep your existing login logic ...
      e.preventDefault();
      setError("");
      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || data.message || "Login failed");
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username || "User");
        window.location.href = "/";
      } catch (err) {
        console.error("Login error:", err);
        setError(err.message || "Login failed");
        setLoading(false);
      }
  };

  return (
    <div className="auth-container">
      
      {/* --- NEW HERO SECTION --- */}
      <div className="hero-section">
        <h1 className="hero-title">Welcome Back</h1>
        <p className="hero-subtitle">Your intelligent workspace awaits.</p>
      </div>
      {/* ------------------------ */}

      <form onSubmit={handleLogin} className="auth-form">
        {/* Removed the old <h2> from inside here */}
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
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      
      <p className="switch-text">
        Don’t have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default Login;