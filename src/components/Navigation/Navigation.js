import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto">
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'text-white font-semibold border-b-2 border-white'
                  : 'text-gray-200 hover:text-white hover:border-b-2 hover:border-white'
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? 'text-white font-semibold border-b-2 border-white'
                  : 'text-gray-200 hover:text-white hover:border-b-2 hover:border-white'
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/lost-reports"
              className={({ isActive }) =>
                isActive
                  ? 'text-white font-semibold border-b-2 border-white'
                  : 'text-gray-200 hover:text-white hover:border-b-2 hover:border-white'
              }
            >
              Lost Reports
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
