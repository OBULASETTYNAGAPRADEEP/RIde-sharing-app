import React, { useState, useEffect } from "react";
import "../css/LiveTracking.css";
import mapImage from "../assets/map-image.webp";

function LiveTracking() {
  const [status, setStatus] = useState("Searching for Available Driver...");
  const [eta, setEta] = useState("Calculating...");
  const [showDriver, setShowDriver] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [mapMarkers, setMapMarkers] = useState({ pickup: null, drop: null });

  useEffect(() => {
    // Get booking details from sessionStorage or localStorage
    const pickup = sessionStorage.getItem("pickupLocation") || localStorage.getItem("pickupLocation") || "Pickup Location";
    const drop = sessionStorage.getItem("dropLocation") || localStorage.getItem("dropLocation") || "Drop Location";
    
    setPickupLocation(pickup);
    setDropLocation(drop);

    // Generate random coordinates for map markers
    const pickupCoords = { lat: (Math.random() * 0.1 + 40.7).toFixed(4), lng: (Math.random() * 0.1 - 74.0).toFixed(4) };
    const dropCoords = { lat: (Math.random() * 0.1 + 40.7).toFixed(4), lng: (Math.random() * 0.1 - 74.0).toFixed(4) };
    setMapMarkers({ pickup: pickupCoords, drop: dropCoords });

    setTimeout(() => setStatus("Driver Found - On the Way"), 3000);
    setTimeout(() => setEta("5 mins"), 5000);
    setTimeout(() => setStatus("Driver Approaching Your Location"), 7000);
    setTimeout(() => setEta("2 mins"), 9000);
    setTimeout(() => setStatus("Driver Arriving Soon"), 12000);
    setTimeout(() => setStatus("Ride Started"), 15000);
  }, []);

  const handleContactClick = () => {
    setShowDriver(!showDriver);
  };

  return (
    <div className="tracking-container">
      <div className="tracking-box">
        <h2 className="tracking-title">Live Ride Tracking</h2>
        <div className="status-section">
          <p className="status-text">{status}</p>
          <p className="eta-text">Estimated Arrival: <strong>{eta}</strong></p>
        </div>

        <div className="booking-details">
          <div className="location-item">
            <span className="location-label">📍 Pickup:</span>
            <span className="location-text">{pickupLocation}</span>
          </div>
          <div className="location-item">
            <span className="location-label">📌 Drop:</span>
            <span className="location-text">{dropLocation}</span>
          </div>
        </div>

        <div className="map-wrapper">
          <img src={mapImage} alt="Map Tracking" className="map-img" />
          <div className="map-overlay">
            {mapMarkers.pickup && (
              <div className="map-marker pickup-marker" title={`Pickup: ${pickupLocation}`}>
                📍
              </div>
            )}
            {mapMarkers.drop && (
              <div className="map-marker drop-marker" title={`Drop: ${dropLocation}`}>
                📌
              </div>
            )}
          </div>
        </div>

        <button className="driver-contact-button" onClick={handleContactClick}>
          ☎️ Contact Driver
        </button>

        {showDriver && (
          <div className="driver-details">
            <h3>Driver Information</h3>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Phone:</strong> +1-234-567-8901</p>
            <p><strong>Vehicle:</strong> Toyota Prius (ABC-1234)</p>
            <p><strong>Rating:</strong> ⭐ 4.8 / 5.0</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveTracking;
