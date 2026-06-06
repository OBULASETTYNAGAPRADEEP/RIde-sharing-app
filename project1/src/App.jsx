import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomeScreen from "./components/HomeScreen";
import RideConfirmation from "./components/RideConfirmation";
import LiveTracking from "./components/LiveTracking";
import PaymentPage from "./components/PaymentPage";
import RideHistory from "./components/RideHistory";
import Profile from "./components/Profile";

// Import the UserManagement component for admin CRUD page
import UserManagement from "./components/UserManagement";

// OTP Components
import SendOtp from "./components/SendOtp";
import VerifyOtp from "./components/VerifyOtp";
import RideBookingForm from "./components/RideBookingFrom";


// Protects pages that require login
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const location = useLocation();
  
  // If we're on the home page and not logged in, redirect to login
  if (!isLoggedIn && location.pathname === "/home") {
    return <Navigate to="/login" />;
  }
  
  // If not logged in and trying to access other protected routes, redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

// Shows Navbar only when user is logged in and not on login/signup/otp pages
function LayoutWithNavbar({ children }) {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const hideNavbarRoutes = ["/login", "/signup", "/send-otp", "/verify-otp"];
  const shouldShowNavbar = isLoggedIn && !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {children}
    </>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Force initial render of splash screen
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    
    // Show splash for 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
      document.body.style.overflow = '';
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <Router>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <LayoutWithNavbar>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* OTP Routes */}
            <Route path="/send-otp" element={<SendOtp />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />

            {/* Admin User Management CRUD */}
            <Route path="/admin/users" element={<UserManagement />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomeScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomeScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ride-confirmation"
              element={
                <ProtectedRoute>
                  <RideConfirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/live-tracking"
              element={
                <ProtectedRoute>
                  <LiveTracking />
                  <RideBookingForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ride-history"
              element={
                <ProtectedRoute>
                  <RideHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </LayoutWithNavbar>
      )}
    </Router>
  );
}

export default App;
