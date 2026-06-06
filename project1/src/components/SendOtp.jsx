import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SendOtp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!name || !email) {
      alert("Please enter both name and email.");
      return;
    }

    try {
      await axios.post("http://localhost:9001/api/user/send-otp", { name, email });
      localStorage.setItem("signup_email", email);
      alert("✅ OTP sent to your email.");
      navigate("/verify-otp");
    } catch (err) {
      alert("❌ " + err.response?.data || "Server error.");
    }
  };

  return (
    <div className="otp-box">
      <h2>Signup - Step 1</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendOtp}>Send OTP</button>
    </div>
  );
};

export default SendOtp;
