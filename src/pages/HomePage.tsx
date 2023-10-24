import React from "react";
import "../styles/tailwind.css";
import { Link } from "react-router-dom";
import businessPepe from "../assets/businesspepe.png";
import { useAuth } from "../auth/auth";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  if (token) {
    navigate("/dashboard");
  }

  return (
    <div className="h-screen bg-custom-pink flex flex-col justify-center items-center pt-32 relative">
      {/* "Not Jobless" Text */}
      <h1 className="text-5xl font-bold text-white mb-8">Still Jobless?</h1>

      <div className="flex space-x-8 mb-24">
        {/* Login Box */}
        <Link
          to="/login"
          aria-label="Login to your account"
          className="p-8 bg-white shadow-md hover:shadow-lg transition transform duration-300 hover:-translate-y-1 rounded-lg cursor-pointer"
        >
          <h2 className="text-2xl font-bold text-center">Log In</h2>
          <p className="text-center mt-2 text-gray-600">Access your account</p>
        </Link>

        {/* Signup Box */}
        <Link
          to="/register"
          aria-label="Sign up for a new account"
          className="p-8 bg-white shadow-md hover:shadow-lg transition transform duration-300 hover:-translate-y-1 rounded-lg cursor-pointer"
        >
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
          <p className="text-center mt-2 text-gray-600">Create a new account</p>
        </Link>
      </div>

      {/* Pepe Image */}
      <img
        src={businessPepe}
        alt="Business Pepe"
        className="absolute left-0 bottom-0 h-500 w-auto md:h-500 md:w-auto"
      />
    </div>
  );
};

export default HomePage;
