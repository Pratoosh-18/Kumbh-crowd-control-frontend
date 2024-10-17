import React from 'react';
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <div className="bg-[#fdfbff] z-10 py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-auto mr-2"
          />
        </div>
        <p className="text-sm text-center md:text-left">
          Project by: <span className="font-bold">Krishna Kant, Pratoosh, Agustya, and Sanskar</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
