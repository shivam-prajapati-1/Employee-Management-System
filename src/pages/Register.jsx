import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

export default function Register() {
  const [name, setName] = useState("");        
  const [email, setEmail] = useState("");      
  const [password, setPassword] = useState(""); 
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await axios.post("https://localhost:7051/api/auth/register", {
        name,
        email,
        password,
      });

     
      setName("");
      setEmail("");
      setPassword("");

      setMsg("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setMsg("Registration failed. Email may already exist.");
    }
  };

  return (
    <AuthLayout>
      <form className="auth-form" onSubmit={handleRegister}>
        {msg && <div className="info-msg">{msg}</div>}

        <input
          type="text"
          className="auth-input"
          placeholder="Full Name"
          value={name}
          autoComplete="off"                 
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          className="auth-input"
          placeholder="Email"
          value={email}
          autoComplete="off"                
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="auth-input"
          placeholder="Password"
          value={password}
          autoComplete="new-password"        
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="auth-btn">Register</button>
      </form>
    </AuthLayout>
  );
}
