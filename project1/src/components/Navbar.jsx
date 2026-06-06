import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="nav-title">🚖 AGRides</h2>
      </div>

      <div className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
        <Link to="/">Home</Link>

        {!isLoggedIn && <Link to="/login">Login</Link>}

        {isLoggedIn && (
          <>
            <Link to="/ride-confirmation">Ride</Link>
            <Link to="/live-tracking">Tracking</Link>
            <Link to="/payment">Payment</Link>
            <Link to="/ride-history">History</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        )}
      </div>

      <div
        className="hamburger"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span />
        <span />
        <span />
      </div>
    </nav>
  );
}

export default Navbar;
