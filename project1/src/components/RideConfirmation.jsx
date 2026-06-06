import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RideConfirmation.css";

function RideConfirmation() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const generateOtpForRide = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    setGeneratedOtp(otp);

    setMessage({
      type: "success",
      text: `OTP Generated: ${otp}`,
    });
  };

  const handleConfirmRide = async () => {
    if (!pickupLocation || !dropLocation) {
      return setMessage({
        type: "error",
        text: "Please enter both Pickup and Drop locations.",
      });
    }

    if (otp !== String(generatedOtp)) {
      return setMessage({
        type: "error",
        text: "Incorrect OTP. Please try again.",
      });
    }

    // OTP Verified
    setMessage({
      type: "success",
      text: "OTP Verified. Ride is being confirmed...",
    });

    const userId = localStorage.getItem("userId");
    const rideData = {
      user: { id: parseInt(userId) },
      startLocation: pickupLocation,
      endLocation: dropLocation,
      rideDate: new Date().toISOString(),
      rideStatus: "PENDING",
    };

    try {
      const response = await fetch("http://localhost:9001/api/ride-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rideData),
      });

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Ride booked successfully!",
        });

        // Save booking details to sessionStorage for tracking page
        sessionStorage.setItem("pickupLocation", pickupLocation);
        sessionStorage.setItem("dropLocation", dropLocation);

        setTimeout(() => navigate("/live-tracking"), 1500);
      } else {
        const errorText = await response.text();
        setMessage({
          type: "error",
          text: "Failed to book ride. " + errorText,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Server error occurred!",
      });
    }
  };

  return (
    <div className="ride-confirmation">
      <div className="ride-card">
        <h2>Book a Ride</h2>

        <input
          type="text"
          placeholder="Pickup Location"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
        />

        <input
          type="text"
          placeholder="Drop Location"
          value={dropLocation}
          onChange={(e) => setDropLocation(e.target.value)}
        />

        <button
          className="ride-btn btn-secondary"
          onClick={generateOtpForRide}
        >
          Generate OTP
        </button>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          className="ride-btn btn-primary"
          onClick={handleConfirmRide}
        >
          Confirm Ride
        </button>

        {message && (
          <p className={`ride-message ${message.type}`}>
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}

export default RideConfirmation;
