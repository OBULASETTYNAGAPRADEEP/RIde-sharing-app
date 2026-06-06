import React, { useEffect, useState } from "react";
import "../css/RideHistory.css";

function RideHistory() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await fetch(
          `http://localhost:9001/api/ride-booking/history?userId=${userId}`
        );
        const data = await response.json();
        setRides(data);
      } catch (error) {
        console.error("Error fetching ride history:", error);
      }
    };

    fetchRides();
  }, []);

  return (
    <div className="ride-history">
      <div className="history-box">
        <h2>Your Ride History</h2>
        {rides.length === 0 ? (
          <p>No rides found 🚫</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>🚕 Pickup</th>
                <th>🎯 Drop</th>
                <th>📅 Date</th>
              </tr>
            </thead>
            <tbody>
              {rides.map((ride) => (
                <tr key={ride.rideId}>
                  <td>{ride.startLocation}</td>
                  <td>{ride.endLocation}</td>
                  <td>{new Date(ride.rideDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default RideHistory;
