import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Reports from './pages/Reports';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home';
import { UserProvider } from './context/UserContext';

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Navigation />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="/CCTVdashboard" element={<Dashboard />} />
        <Route path="/lost-reports" element={<Reports />} />
      </Routes>
    </>
  );
};

const AppWrapper = () => {
  return (
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  );
};

export default AppWrapper;