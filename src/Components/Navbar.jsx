import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
  
function Navbar() {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    try {
      setUser(JSON.parse(savedUser));
    } catch (e) {
      console.log("No user found");
    }
  }
}, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    window.location.href = "/login";
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo" onClick={closeMenu}>
        <h2>Tech <span>4</span> Youth</h2>
      </Link>

      {/* Hamburger Button - Ana gani a Mobile kawai */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
        <Link to="/courses" className="nav-link" onClick={closeMenu}>Courses</Link>
        {user ? (
          <>
            <span className="user-name">👋 {user.name}</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link btn-login" onClick={closeMenu}>Login</Link>
            <Link to="/register" className="nav-link btn-register" onClick={closeMenu}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;