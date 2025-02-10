import React from "react";
import { Link } from "react-router-dom";

const BannerNavbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center px-8 h-16 bg-gray-100 shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">
        <Link to="/">Deep Work</Link>
      </div>

      {/* Nav */}
      <div className="flex space-x-4">
        <Link
          to="/register"
          className="px-4 py-2 text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 transition"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="px-4 py-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default BannerNavbar;
