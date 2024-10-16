import React from 'react';
import logo from "../../assets/logo.png"

const Footer = () => {
  return (
    <div className="bg-[#fdfbff] z-10 py-4">
      <div className="mx-10 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-auto mr-2"
          />
        </div>
        <p className="text-sm">
          Project by: <span className="font-bold">Krishna Kant, Pratoosh, Agustya, and Sanskar</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
