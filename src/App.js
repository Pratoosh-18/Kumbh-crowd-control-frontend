import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Reports from './pages/Reports';
import Navigation from './components/Navigation/Navigation';

const App = () => {
  return (
    <Router>
      <Navigation />
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lost-reports" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
