import React from "react";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  return (
    <div className="h-screen bg-custom-pink flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Username
            </label>
            <input
              type="text"
              className="p-2 w-full border rounded-md"
              placeholder="Enter username"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              className="p-2 w-full border rounded-md"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              className="p-2 w-full border rounded-md"
              placeholder="Enter password"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="p-2 w-full border rounded-md"
              placeholder="Confirm password"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
