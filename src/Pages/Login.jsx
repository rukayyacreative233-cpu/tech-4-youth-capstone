
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      setLoading(true);
      const res = await fetch("https://tech4youth-capstone-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage("Login successful!");
        window.location.href = "/courses";
      } else {
        setMessage(data.message || "Invalid email or password");
      }
    } catch (err) {
      setMessage("Server not running");
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-page">

        <div className="login-card">

          <h1>Welcome Back!</h1>

          <p>Login to continue your learning journey.</p>

          <form onSubmit={handleLogin}>

            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

             {message && <p>{message}</p>}

            <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="register-text">
            Don't have an account? <a href="/register">Register</a>
          </p>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Login;