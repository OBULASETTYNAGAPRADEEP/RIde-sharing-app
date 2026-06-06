import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");
  const navigate = useNavigate();

  const generateOtp = () => {
    if (!email || !name) {
      setStatusType("error");
      setStatusMessage("Please enter your name and email before generating OTP.");
      return;
    }

    const otpValue = Math.floor(1000 + Math.random() * 9000);
    setGeneratedOtp(otpValue);
    setStatusType("success");
    setStatusMessage(`OTP sent to ${email}. Use the code to complete signup.`);
    console.log("Generated OTP:", otpValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!generatedOtp) {
      setStatusType("error");
      setStatusMessage("Generate an OTP before submitting the form.");
      return;
    }

    if (otp !== String(generatedOtp)) {
      setStatusType("error");
      setStatusMessage("Incorrect OTP. Please enter the correct code.");
      return;
    }

    const userData = { email, name };

    try {
      const response = await fetch("http://localhost:9001/api/user/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setStatusType("success");
        setStatusMessage("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 900);
      } else {
        setStatusType("error");
        setStatusMessage("Signup failed. Please try again later.");
      }
    } catch {
      setStatusType("error");
      setStatusMessage("Unable to reach the server. Please check your connection.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <div>
            <p className="eyebrow">Welcome to RidePro</p>
            <h1>Create your account</h1>
          </div>
          <span className="badge">Secure Signup</span>
        </div>

        <p className="subtitle">Quickly create an account to start booking rides with confidence.</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <label>
            Full Name
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <div className="otp-row">
            <button type="button" className="secondary" onClick={generateOtp}>
              Generate OTP
            </button>
            <label className="otp-field">
              OTP Code
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </label>
          </div>

          <button type="submit" className="primary">
            Sign Up
          </button>
        </form>

        {statusMessage && (
          <p className={`status-message ${statusType === "success" ? "success" : "error"}`}>
            {statusMessage}
          </p>
        )}

        <div className="signup-footer">
          <span>Already have an account?</span>
          <button type="button" className="text-button" onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
