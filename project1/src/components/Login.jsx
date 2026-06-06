import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css";
import signPageImg from "../assets/sign page.png";

function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  // Email validation
  const validateEmail = (value) => {
    if (!value) return "";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value) ? "" : "Enter a valid email address";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    setEmailError(emailErr);

    if (!name || !email) {
      setMessage("Please enter your full name and email.");
      return;
    }
    if (emailErr) {
      setMessage("Please correct any errors before logging in.");
      return;
    }
    try {
      const response = await fetch("http://localhost:9001/api/user/all");
      const users = await response.json();
      const user = users.find(
        (user) => user.email === email && user.name === name
      );
      if (user) {
        setMessage("✅ Login Successful! Redirecting...");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", user.id);
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage("❌ Invalid credentials. Please check your input or sign up.");
      }
    } catch (error) {
      setMessage("❌ Server Error. Try again later.");
    }
  };

  return (
    <div className="login-full-bg">
      <form className="login-center-box" onSubmit={handleLogin}>
        <div className="login-header">
          <img src={signPageImg} alt="Logo" className="login-logo" />
          <h1>Sign In</h1>
          <p>Access your account with Name & Email.</p>
        </div>
        <div className="login-form">
          <label htmlFor="name" className="input-label">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-input"
            autoFocus
            required
          />
          <label htmlFor="email" className="input-label">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(validateEmail(e.target.value));
            }}
            className={`login-input${emailError ? " error" : ""}`}
            required
          />
          {emailError && <div className="input-error">{emailError}</div>}
          <button type="submit" className="login-btn">
            Login
          </button>
          {message && <div className="login-message">{message}</div>}
        </div>
        <div className="login-footer">
          <span>
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
