import "./Auth.css";
import { Link } from "react-router-dom";

export default function AuthLayout({ children }) {
  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Navbar Style */}
        <div className="auth-navbar">
          <h2>Employee Management System</h2>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        {/* Actual Form */}
        <div className="auth-content">{children}</div>
      </div>
    </div>
  );
}
