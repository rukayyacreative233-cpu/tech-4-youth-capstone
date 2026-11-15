import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
if (password !== confirmPassword) {
  setMessage("Passwords do not match.");
  return;
}
setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message);
        return;
      }
      setMessage("Registered! Please login");
      navigate("/login");

      } catch (err) {
    setMessage("Server not running");
  } finally {
    setLoading(false);
  }
  };
  return (
    <>
      <Navbar />

      <div className="register-page">
        <div className="register-card">
          <h1>Create Account</h1>
          <p>Join Tech for Youth and start learning today.</p>

          <form onSubmit={handleRegister}>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
              placeholder="Create a password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {message && <p>{message}</p>}
            
            <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
          </button>
          </form>

          <p className="login-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Register;