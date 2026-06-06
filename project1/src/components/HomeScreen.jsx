import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/HomeScreen.css";

import autoImage from "../assets/Auto.webp";
import bikeImage from "../assets/Bike.webp";
import cabImage from "../assets/Cab.webp";

function HomeScreen() {
  const [selectedRide, setSelectedRide] = useState("Auto");
  const navigate = useNavigate();

  const handleBookRide = () => {
    navigate("/ride-confirmation", { state: { rideType: selectedRide } });
  };

  return (
    <div className="home-container">
      <div className="overlay" />
      <div className="home-box">
        <h1 className="home-title">🚗 Book Your Ride Instantly</h1>
        <p className="home-subtitle">Fast, Reliable, and Affordable Travel</p>

        <div className="ride-selection">
          <h2>Select Your Ride Type</h2>
          <div className="ride-options">
            {[
              { type: "Auto", image: autoImage },
              { type: "Bike", image: bikeImage },
              { type: "Cab", image: cabImage },
            ].map((ride) => (
              <label
                key={ride.type}
                className={`ride-card ${selectedRide === ride.type ? "active" : ""}`}
              >
                <input
                  type="radio"
                  name="rideType"
                  value={ride.type}
                  checked={selectedRide === ride.type}
                  onChange={() => setSelectedRide(ride.type)}
                  hidden
                />
                <img src={ride.image} alt={ride.type} />
                <span>{ride.type}</span>
              </label>
            ))}
          </div>

          <button className="book-button" onClick={handleBookRide}>
            🚀 Book Ride
          </button>
        </div>

        <div className="home-info">
          <h3>Why Choose Us?</h3>
          <ul>
            <li>🛺 Wide range of vehicle options</li>
            <li>💸 Affordable fares, no hidden charges</li>
            <li>⚡ Easy and quick booking</li>
            <li>📍 Real-time ride tracking</li>
            <li>🛡️ Safety ensured with verified drivers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
