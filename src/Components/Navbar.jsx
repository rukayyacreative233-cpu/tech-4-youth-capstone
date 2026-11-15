import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
  
function Navbar() {
    const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
          }
          return;
        }
        const data = await response.json();
        setUser(data.user || data);
      } catch (error) {
        console.error("Unable to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };
  return (
    <nav className="navbar">

      <h2>Tech <span>4</span> Youth</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        {user ? (
  <>
    <span>{user.name}</span>
    <button onClick={handleLogout}>Logout</button>
  </>
) : (
  <>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </>
)}
        
      </div>

    </nav>
  );
}

export default Navbar;