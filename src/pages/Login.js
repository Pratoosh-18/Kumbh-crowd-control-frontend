import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoFull from '../assets/logoFull.png';
import loginBG from '../assets/loginBG.jpeg';
import loginBG2 from '../assets/loginBG2.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    navigate('/dashboard');
  };

  return (
    <div 
    className="flex justify-center items-center min-h-screen bg-cover bg-center"
    style={{ backgroundImage: `url(${loginBG})` }}
    // style={{ backgroundImage: `url(${loginBG2})` }}
    >
      <div className="bg-[#e7e7e7]/100 shadow-lg rounded-lg p-8 w-96 flex flex-col gap-5">
        <div className="w-full flex justify-center">
          <img src={logoFull} alt="logo" className="h-36" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="font-semibold text-gray-700">Admin Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#562e2c]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="font-semibold text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#562e2c]"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-[#562e2c] hover:bg-[#361d1c] text-white py-2 rounded transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
