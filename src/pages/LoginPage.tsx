import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../auth/authService";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = await login(username, password);
      sessionStorage.setItem("token", token);
      // alert("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error", error);
      alert("Login failed. Please check your username and password.");
    }
  };
  return (
    <div className="h-screen bg-custom-pink flex flex-col justify-center items-center">
      {/* Login Box */}
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Log In</h1>

        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Username
            </label>
            <input
              type="text"
              className="p-2 w-full border rounded-md"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              className="p-2 w-full border rounded-md"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Log In
          </button>
        </form>

        {/* Forgot Password and Signup Link */}
        <div className="flex flex-col mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-blue-500 hover:underline mb-2"
          >
            Forgot Password?
          </Link>
          <div>
            New here?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
