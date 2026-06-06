import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("signup_email");

  const handleVerify = async () => {
    if (!otp) {
      alert("Enter the OTP sent to your email.");
      return;
    }

    try {
      await axios.post("http://localhost:9001/api/user/verify-otp", { email, otp });
      alert("✅ OTP verified. Please login.");
      navigate("/login");
    } catch (err) {
      alert("❌ " + err.response?.data || "OTP verification failed.");
    }
  };

  return (
    <div className="otp-box">
      <h2>Signup - Step 2: Verify OTP</h2>
      <p>OTP sent to: <strong>{email}</strong></p>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerify}>Verify OTP</button>
    </div>
  );
};

export default VerifyOtp;
