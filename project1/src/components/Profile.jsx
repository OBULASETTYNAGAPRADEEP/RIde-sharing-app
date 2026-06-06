

import React, { useEffect, useState } from "react";
import "../css/Profile.css";

const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // public avatar


const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [balance, setBalance] = useState(1000);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    const userId = localStorage.getItem("userId");
    
    // Load wallet balance from localStorage
    const savedBalance = localStorage.getItem("walletBalance");
    if (savedBalance) {
      setBalance(parseFloat(savedBalance));
    }
    
    if (loggedIn && userId) {
      // Fetch user details from database
      fetch(`http://localhost:9001/api/user/${userId}`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch user details");
          return res.json();
        })
        .then(data => {
          setUser({ name: data.name, email: data.email });
        })
        .catch(err => {
          setError("Unable to load user details.");
        });
    }

    // Set up interval to check for balance updates from payment page
    const interval = setInterval(() => {
      const currentBalance = localStorage.getItem("walletBalance");
      if (currentBalance) {
        setBalance(parseFloat(currentBalance));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAddFunds = () => {
    setError("");
    const amountStr = prompt("Enter amount to add:");
    if (amountStr === null) return; // Cancelled
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid positive number.");
      return;
    }
    const newBalance = balance + amount;
    setBalance(newBalance);
    localStorage.setItem("walletBalance", newBalance.toString());
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setUser({ name: "", email: "" });
  };

  return (
    <div className="profile-container" role="main" aria-label="User Profile">
      <div className="profile-box">
        <div className="profile-avatar-wrapper">
          <img
            src={defaultAvatar}
            alt="User Avatar"
            className="profile-avatar"
          />
        </div>
        <h2 className="profile-title">User Profile</h2>
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name ? user.name : <span style={{color: 'gray'}}>Not set</span>}</p>
          <p><strong>Email:</strong> {user.email ? user.email : <span style={{color: 'gray'}}>Not set</span>}</p>
          <p><strong>Account Balance:</strong> <span aria-live="polite">₹{balance.toFixed(2)}</span></p>
          <p><strong>Login Status:</strong> {isLoggedIn ? <span style={{color: 'green'}}>Logged In</span> : <span style={{color: 'red'}}>Logged Out</span>}</p>
        </div>
        {error && <div className="profile-error" role="alert" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
        <button
          className="funds-btn"
          onClick={handleAddFunds}
          aria-label="Add funds to account"
        >
          ➕ Add Funds
        </button>
        {isLoggedIn && (
          <button
            className="funds-btn"
            style={{ backgroundColor: '#dc3545', marginLeft: '10px' }}
            onClick={handleLogout}
            aria-label="Logout"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
