import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import businessPepe from "../assets/businesspepe.png";
import { useRegister } from "../hooks/useUsers";
import { USER_TYPE } from "../types";

const RegisterPage: React.FC = () => {
  const registerMutation = useRegister();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("formData", formData);
    registerMutation.mutate(
      {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        user_type: formData.userType as USER_TYPE,
      },
      {
        onSuccess: () => {
          alert("Registration successful");
          // Optionally, redirect the user to another page
          navigate("/login");
        },
        onError: (error: { message?: string } | unknown) => {
          if ((error as { message?: string }).message) {
            alert((error as { message?: string }).message);
          } else {
            alert("An unknown error occurred");
          }
        },
      }
    );
  };
  return (
    <div className="h-screen bg-custom-pink flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

        <form onSubmit={handleFormSubmit} autoComplete="off">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
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
              name="email"
              value={formData.email}
              onChange={handleInputChange}
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
              name="password"
              value={formData.password}
              onChange={handleInputChange}
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
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="p-2 w-full border rounded-md"
              placeholder="Confirm password"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              User Type
            </label>

            <select
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              className={`p-2 w-full border rounded-md ${
                !formData.userType ? "text-gray-400" : "text-black"
              }`}
            >
              <option value="" disabled hidden>
                Choose User Type
              </option>
              <option value="client">Client</option>
              <option value="freelancer">Freelancer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-custom-coral text-white rounded-md hover:bg-dark-pink transition duration-300"
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
      {/* Pepe Image */}
      <img
        src={businessPepe}
        alt="Business Pepe"
        className="absolute left-0 bottom-0 h-500 w-auto md:h-500 md:w-auto"
      />
    </div>
  );
};

export default RegisterPage;
