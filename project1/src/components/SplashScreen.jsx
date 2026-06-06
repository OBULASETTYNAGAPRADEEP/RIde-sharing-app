import React, { useEffect, useState } from "react";
import "../css/SplashScreen.css";
import logo from "../assets/AGRIDES.png";

function SplashScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="splash-container" role="status" aria-live="polite">
      <img src={logo} alt="AGRides" className="splash-logo animated-logo" />
      <h1 className="splash-title">AGRides</h1>
      <p className="splash-subtitle">Fast, reliable rides — wherever you go.</p>
      
      <div className="progress-wrap">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="credit-text">
        Done by: O. Naga Pradeep
      </div>
    </div>
  );
}

export default SplashScreen;
