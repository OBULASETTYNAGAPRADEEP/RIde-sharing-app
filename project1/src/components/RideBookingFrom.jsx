import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix for Leaflet icon issues
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LocationPicker = ({ setLocation }) => {
  useMapEvents({
    click(e) {
      setLocation([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const RideBookingForm = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startCoords, setStartCoords] = useState([40.7128, -74.006]); // Default: NYC
  const [endCoords, setEndCoords] = useState([42.3601, -71.0589]); // Default: Boston

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ride = {
        user: { id: 1 }, // Replace with actual user ID
        startLocation,
        endLocation,
        rideDate: new Date().toISOString(),
        rideStatus: "PENDING",
        startLatitude: startCoords[0],
        startLongitude: startCoords[1],
        endLatitude: endCoords[0],
        endLongitude: endCoords[1],
      };

      const response = await axios.post("http://localhost:9001/api/ride-booking", ride);
      alert("Ride booked!");
      console.log(response.data);
    } catch (error) {
      alert("Failed to book ride");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Book a Ride</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Start Location"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          className="border p-2 m-2"
        />
        <input
          type="text"
          placeholder="End Location"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          className="border p-2 m-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Book Ride
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Select Start Coordinates</h3>
          <MapContainer center={startCoords} zoom={13} style={{ height: "300px" }}>
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationPicker setLocation={setStartCoords} />
            <Marker position={startCoords} />
          </MapContainer>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Select End Coordinates</h3>
          <MapContainer center={endCoords} zoom={13} style={{ height: "300px" }}>
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationPicker setLocation={setEndCoords} />
            <Marker position={endCoords} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default RideBookingForm;
