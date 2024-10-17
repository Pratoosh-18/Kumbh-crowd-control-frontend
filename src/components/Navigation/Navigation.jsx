import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { navigationRoutes } from '../../Constants/Routes';
import ConfirmModal from '../Modal/ConfirmModal';
import { useUser } from '../../context/UserContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const { unsetUserDetails } = useUser();

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

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen); // Toggle navigation visibility
  };

  // New function to handle navigation and closing the navbar
  const handleNavClick = (path) => {
    setIsNavOpen(false); // Close the navbar
    if (path !== '/logout') {
      navigate(path); // Navigate to the selected path
    } else {
      openLogoutModal(); // Open logout modal if the logout option is clicked
    }
  };

  return (
    <nav className="bg-[#fdfbff] px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <NavLink to={"/home"}>
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </NavLink>
        </div>

        {/* Hamburger Button for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleNav} className="text-gray-600 focus:outline-none">
            {isNavOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`md:flex md:space-x-6 fixed inset-0 md:relative top-16 md:top-0 right-0 bg-[#fdfbff] md:bg-transparent z-10 flex-col md:flex-row items-center transition-all duration-300 ease-in-out md:opacity-100 ${
            isNavOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none md:pointer-events-auto'
          }`}
        >
          {navigationRoutes.map((route) => (
            <li key={route.path} className="w-full md:w-auto text-center md:text-left py-2">
              <button
                onClick={() => handleNavClick(route.path)} // Use the new handleNavClick function
                className={`w-full block text-gray-600 hover:text-[#55302c] ${
                  route.path === '/logout' ? 'font-semibold' : ''
                } ${route.path === '/logout' ? 'hover:border-b-2 hover:border-[#55302c]' : ''}`}
              >
                {route.label}
              </button>
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
