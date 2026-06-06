import React from 'react';
import RideMapWithVehicle from './RideMapWithVehicle';
import '../css/MapDemo.css';

const MapDemo = () => {
  // Example coordinates (Bengaluru)
  const start = [12.9715987, 77.594566];
  const end = [12.935192, 77.624480];

  return (
    <div className="map-demo-page" style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 10 }}>Map demo</h2>
      <p style={{ marginTop: 0, marginBottom: 12, color: '#444' }}>This demo shows the route and an animated vehicle marker.</p>
      <div style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)', borderRadius: 8, overflow: 'hidden' }}>
        <RideMapWithVehicle startCoords={start} endCoords={end} height={520} />
      </div>
    </div>
  );
};

export default MapDemo;
