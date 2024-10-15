import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Reports from './pages/Reports';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home';
import { UserProvider } from './context/UserContext';
import { LostReportsProvider } from './context/LostReportsContext';
import Footer from './components/Footer/Footer';
import Detection from './pages/Detection';
import CCTVDashboard from './pages/CCTVDashboard';

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Navigation />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="/CCTVDashboard" element={<CCTVDashboard />} />
        <Route path="/Detection" element={<Detection />} />
        <Route path="/lost-reports" element={<Reports />} />
      </Routes>
      {location.pathname !== '/' && <Footer />}
    </>
  );
};

const AppWrapper = () => {
  return (
    <UserProvider>
      <LostReportsProvider>
        <Router>
          <App />
        </Router>
      </LostReportsProvider>
    </UserProvider>
  );
};

export default AppWrapper;