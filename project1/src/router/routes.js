import { Route, Routes } from 'react-router-dom';
import SplashScreen from '../components/SplashScreen';
import Login from '../components/Login';
import HomeScreen from '../components/HomeScreen';
import RideConfirmation from '../components/RideConfirmation';
import LiveTracking from '../components/LiveTracking';
import PaymentPage from '../components/PaymentPage';
import RideHistory from '../components/RideHistory';
import MapDemo from '../components/MapDemo';

export const Routes = () => (
  <Routes>
    {/* Serve Home at root so http://localhost:5173/ shows the app immediately */}
    <Route path="/" element={<HomeScreen />} />
    <Route path="/splash" element={<SplashScreen />} />
    <Route path="/login" element={<Login />} />
    <Route path="/home" element={<HomeScreen />} />
    <Route path="/ride-confirmation" element={<RideConfirmation />} />
    <Route path="/live-tracking" element={<LiveTracking />} />
    <Route path="/map-demo" element={<MapDemo />} />
    <Route path="/payment" element={<PaymentPage />} />
    <Route path="/ride-history" element={<RideHistory />} />
  </Routes>
);
