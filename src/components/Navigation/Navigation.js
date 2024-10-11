// src/components/Navigation.js

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { navigationRoutes } from '../../Constants/Routes';

const Navigation = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    navigate('/');
  };

  return (
    <nav className="bg-white px-10 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </div>

        <ul className="flex space-x-6">
          {navigationRoutes.map((route) => (
            <li key={route.path}>
              {route.path === '/logout' ? (
                <button
                  onClick={logoutUser}
                  className="text-gray-600 hover:text-blue-600 font-semibold hover:border-b-2 hover:border-blue-600 focus:outline-none"
                >
                  {route.label}
                </button>
              ) : (
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600'
                  }
                >
                  {route.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
