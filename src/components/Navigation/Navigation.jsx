import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { navigationRoutes } from '../../Constants/Routes';
import ConfirmModal from '../Modal/ConfirmModal';
import { useUser } from '../../context/UserContext';

const Navigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const {unsetUserDetails} = useUser()

  const logoutUser = () => {
    setIsModalOpen(false);
    unsetUserDetails();
    navigate('/');
  };

  const openLogoutModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="bg-[#fdfbff] px-10 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <NavLink to={"/home"}>
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </NavLink>
        </div>

        <ul className="flex space-x-6">
          {navigationRoutes.map((route) => (
            <li key={route.path}>
              {route.path === '/logout' ? (
                <button
                  onClick={openLogoutModal}
                  className="text-gray-600 hover:text-[#55302c] font-semibold hover:border-b-2 hover:border-[#55302c] focus:outline-none"
                >
                  {route.label}
                </button>
              ) : (
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-[#55302c] font-semibold border-b-2 border-[#55302c]'
                      : 'text-gray-600 hover:text-[#55302c] hover:border-b-2 hover:border-[#55302c]'
                  }
                >
                  {route.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {isModalOpen && (
          <ConfirmModal
            message="Are you sure you want to log out?"
            onConfirm={logoutUser}
            onClose={closeModal}
            confirmMessage="Logout"
            confirmButtonColor="bg-red-500"
          />
        )}
      </div>
    </nav>
  );
};

export default Navigation;
