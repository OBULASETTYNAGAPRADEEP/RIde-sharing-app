import React, { useEffect, useRef } from "react";
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-polylinedecorator";
import PropTypes from "prop-types";

/**
 * RideMapWithVehicle
 * - Draws a route between startCoords and endCoords using leaflet-routing-machine
 * - Adds a polyline decorator (arrows) and a smoothly animated vehicle marker
 * - Cleans up all Leaflet controls/layers and animation frames on unmount or coords change
 */
const defaultVehicleIcon = "https://cdn-icons-png.flaticon.com/512/61/61168.png";

const RideMapWithVehicle = ({ startCoords, endCoords, vehicleIconUrl = defaultVehicleIcon, height = 400 }) => {
  const mapRef = useRef(null);
  const routingRef = useRef(null);
  const markerRef = useRef(null);
  const decoratorRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Basic validation
    if (!startCoords || !endCoords || startCoords.length < 2 || endCoords.length < 2) return;
    const map = mapRef.current;
    if (!map) return;

    // Cleanup previous routing control if present
    if (routingRef.current) {
      try { map.removeControl(routingRef.current); } catch (err) { /* ignore */ }
      routingRef.current = null;
    }

    const waypoints = [L.latLng(startCoords[0], startCoords[1]), L.latLng(endCoords[0], endCoords[1])];

    const routingControl = L.Routing.control({
      waypoints,
      createMarker: () => null,
      addWaypoints: false,
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      lineOptions: { styles: [{ color: '#1976d2', weight: 5 }] },
    }).addTo(map);

    routingRef.current = routingControl;

    const onRoutesFound = (e) => {
      const route = e.routes && e.routes[0] && e.routes[0].coordinates;
      if (!route || !route.length) return;

      // Convert to LatLng instances
      const coords = route.map((c) => L.latLng(c.lat || c[1] || c[0], c.lng || c[0] || c[1]));

      // Fit bounds nicely
      try { map.fitBounds(L.latLngBounds(coords), { padding: [40, 40] }); } catch (err) { /* ignore */ }

      // Draw a visible polyline for the route
      const routeLine = L.polyline(coords, { color: '#1976d2', weight: 4, opacity: 0.95 }).addTo(map);

      // Add arrow decorator
      const decorator = L.polylineDecorator(routeLine, {
        patterns: [
          { offset: 20, repeat: 60, symbol: L.Symbol.arrowHead({ pixelSize: 8, polygon: false, pathOptions: { stroke: true, color: '#1976d2' } }) },
        ],
      }).addTo(map);

      decoratorRef.current = decorator;

      // Create vehicle marker with proper icon
      const icon = L.icon({
        iconUrl: vehicleIconUrl,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      // Remove previous marker if exists
      if (markerRef.current) {
        try { map.removeLayer(markerRef.current); } catch (err) { }
        markerRef.current = null;
      }

      const vehicleMarker = L.marker(coords[0], { icon }).addTo(map);
      markerRef.current = vehicleMarker;

      // Smooth animation along route using time-based interpolation
      const speedMetersPerSec = 35; // adjust speed visually

      let segIndex = 0;
      let segStartTime = null;
      let segDuration = 0;

      // helper to get distance
      const distance = (a, b) => a.distanceTo(b);

      const startSegment = (index, time) => {
        segIndex = index;
        segStartTime = time;
        const from = coords[index];
        const to = coords[index + 1];
        const dist = distance(from, to); // meters
        segDuration = Math.max(10, (dist / speedMetersPerSec) * 1000); // ms
      };

      const step = (timestamp) => {
        if (!segStartTime) startSegment(0, timestamp);

        const from = coords[segIndex];
        const to = coords[segIndex + 1];
        if (!to) return; // finished

        const elapsed = timestamp - segStartTime;
        const t = Math.min(1, elapsed / segDuration);
        const lat = from.lat + (to.lat - from.lat) * t;
        const lng = from.lng + (to.lng - from.lng) * t;
        vehicleMarker.setLatLng([lat, lng]);

        if (t >= 1) {
          // move to next segment
          if (segIndex < coords.length - 2) {
            startSegment(segIndex + 1, timestamp);
          } else {
            // animation finished
            return;
          }
        }

        rafRef.current = requestAnimationFrame(step);
      };

      // Start animation
      rafRef.current = requestAnimationFrame(step);

      // cleanup for this route
      const cleanupRoute = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        try { map.removeLayer(routeLine); } catch (err) {}
        try { map.removeLayer(decorator); } catch (err) {}
        try { map.removeLayer(vehicleMarker); } catch (err) {}
        decoratorRef.current = null;
        markerRef.current = null;
      };

      // store cleanup on routingRef so global cleanup can remove it too
      routingRef.current._cleanupRoute = cleanupRoute;
    };

    routingControl.on('routesfound', onRoutesFound);

    // route calculation will trigger 'routesfound'

    return () => {
      // remove event listener
      try { routingControl.off('routesfound', onRoutesFound); } catch (err) {}

      // run route-level cleanup if any
      try { if (routingRef.current && routingRef.current._cleanupRoute) routingRef.current._cleanupRoute(); } catch (err) {}

      try { map.removeControl(routingControl); } catch (err) {}
      routingRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startCoords, endCoords, vehicleIconUrl]);

  return (
    <MapContainer
      center={startCoords}
      zoom={13}
      style={{ height: `${height}px`, width: "100%" }}
      whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

RideMapWithVehicle.propTypes = {
  startCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  endCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  vehicleIconUrl: PropTypes.string,
  height: PropTypes.number,
};

export default RideMapWithVehicle;
