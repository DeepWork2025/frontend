import React from "react";
import { Link } from "react-router-dom";

const BannerContent: React.FC = () => {
  return (
    <div className="flex justify-between items-center h-screen px-16">
      {/* left */}
      <div className="w-1/2 space-y-6">
        <h1 className="text-5xl font-bold text-gray-900">
          Welcome to Deep Work
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Discover our platform, enhance your productivity, and achieve more!
          Whether you're managing tasks or exploring new opportunities, we've
          got you covered.
        </p>
        <Link
          to="/register"
          className="inline-block px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 transition"
        >
          Free Sign Up
        </Link>
      </div>

      {/* right */}
      <div className="w-1/2 flex justify-center">
        <img
          src="/images/deepWork.webp"
          alt="Productivity Illustration"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default BannerContent;
