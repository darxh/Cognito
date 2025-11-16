import { useLocation, Link } from "react-router-dom";
import "./AuthNavbar.css";

const AuthNavbar = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <nav className="auth-navbar">
      <div className="nav-left">
        <img
          src="https://i.postimg.cc/gkLLmfYp/Your_Visual_Identity_Starts_Here_removebg_preview.png"
          alt="Cognito Logo"
          className="nav-logo"
        />
        <span className="nav-title">Cognito</span>
      </div>

      <div className="nav-right">
        <a href="https://github.com/darxh/Cognito" className="nav-link">
          Docs
        </a>

        <Link to={isLogin ? "/signup" : "/login"} className="nav-link">
          {isLogin ? "Sign Up" : "Login"}
        </Link>
      </div>
    </nav>
  );
};

export default AuthNavbar;
