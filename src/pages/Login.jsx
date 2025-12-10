// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { loginApi } from "../api/authApi";
// import { loginSuccess } from "../redux/authSlice";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await loginApi({ email, password });

      
//       console.log("LOGIN RESPONSE:", res.data);

//       dispatch(
//         loginSuccess({
//           user: {
//             id: res.data.id,
//             name: res.data.name,
//             email: res.data.email,
//           },
//           token: res.data.token,
//         })
//       );

//       navigate("/employee"); 
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Invalid credentials");
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 300 }}>
//         <input
//           type="email"
//           placeholder="Email"
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

//         <button
//           type="button"
//           onClick={() => navigate("/register")}
//           style={{ background: "transparent", border: "none", color: "blue", textDecoration: "underline" }}
//         >
//           Go to Register
//         </button>
//       </form>
//     </div>
//   );
// }







import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

export default function Login() {
  const [email, setEmail] = useState("");     
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://localhost:7051/api/auth/login", {
        email,
        password,
      });

      
      dispatch(loginSuccess(res.data));

      
      setEmail("");
      setPassword("");

      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <AuthLayout>
      <form className="auth-form" onSubmit={handleSubmit}>
        
        {error && <div className="error-msg">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={email}
          autoComplete="off"      
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          autoComplete="new-password" 
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="auth-btn">Login</button>
      </form>
    </AuthLayout>
  );
}
