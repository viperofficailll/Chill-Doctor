import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="./logo.jpg" alt="Logo" className="h-8 w-8" />
        <span className="text-2xl font-bold text-blue-900">Chill-Doctor</span>
      </div>

      <div className="space-x-6">
        <button
          onClick={() => navigate("/about")}
          className="text-blue-900 hover:text-blue-600 text-lg font-medium transition duration-300"
        >
          About Us
        </button>
        <button
          onClick={() => navigate("/contact")}
          className="text-blue-900 hover:text-blue-600 text-lg font-medium transition duration-300"
        >
          Contact Us
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
