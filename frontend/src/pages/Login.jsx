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
import "../styles/Auth.css"; // Updated import path

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 1. Add loading state
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = (
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
  ).replace(/\/+$/, "");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // 2. Start loading
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || data.message || "Login failed");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username || "User");

      window.location.href = "/";
      // Note: We don't set loading false here because the page is about to reload/redirect
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");

      // 3. Stop loading if there is an error so user can try again
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>
      <form onSubmit={handleLogin} className="auth-form">
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

        {/* 4. Disable button while loading and change text */}
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
