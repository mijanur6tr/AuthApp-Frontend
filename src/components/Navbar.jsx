import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextStore } from '../context/contextStore.jsx';

export const Navbar = () => {
  const { token, setToken } = useContext(ContextStore);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md py-2 px-6 w-full">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Brand */}
        <div 
          className="text-2xl font-bold text-blue-600 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          AuthApp
        </div>

        {/* Auth Buttons */}
        {token ? (
          <button
            onClick={handleLogOut}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-sm shadow-md transition duration-200"
          >
            Log Out
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-sm shadow-md transition duration-200"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-sm shadow-md transition duration-200"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
