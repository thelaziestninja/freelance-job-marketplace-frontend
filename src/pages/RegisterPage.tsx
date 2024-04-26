import React, { useState } from "react";
import { RegisterUserDataI } from "../types";
import Label from "../components/registration/Label";
import { Link, useNavigate } from "react-router-dom";
import businessPepe from "../assets/businesspepe.png";
import InputField from "../components/registration/InputField";
import { useRegisterUserMutation } from "../features/users/usersApiSlice";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
  [key: string]: string; // This is the index signature
};

export const RegisterPage: React.FC = () => {
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
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
    setFormData({ ...formData, [name]: value });
  };

  // const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   try {
  //     e.preventDefault();
  //     if (formData.password !== formData.confirmPassword) {
  //       return alert("Passwords do not match");
  //     }
  //     await registerUser({
  //       username: formData.username,
  //       email: formData.email,
  //       password: formData.password,
  //       user_type: formData.userType,
  //     }).unwrap();
  //     alert("Registration successful");
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Registration error", error);
  //     if (error instanceof Error) {
  //       alert(error.message || "An unknown error occurred");
  //     }
  //   }
  // };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, userType } = formData;

    // Basic client-side validation
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!username || !email || !password || !userType) {
      alert("Please fill in all fields.");
      return;
    }

    const userData: RegisterUserDataI = {
      username,
      email,
      password,
      user_type: userType as "freelancer" | "client",
    };

    try {
      await registerUser(userData).unwrap();
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration error", error);
      if (error instanceof Error) {
        alert(error.message || "An unknown error occurred");
      }
    }
  };

  return (
    <div className="h-screen bg-custom-pink flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <form onSubmit={handleFormSubmit}>
          {[
            ["username", "Enter username"],
            ["email", "Enter email"],
            ["password", "Enter password"],
            ["confirmPassword", "Confirm password"],
          ].map(([name, placeholder]) => (
            <div className="mb-4" key={name}>
              <Label>{name.charAt(0).toUpperCase() + name.slice(1)}</Label>
              <InputField
                type={name.includes("password") ? "password" : "text"}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                placeholder={placeholder}
              />
            </div>
          ))}
          <div className="mb-4">
            <Label>User Type</Label>
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
        <img
          src={businessPepe}
          alt="Business Pepe"
          className="absolute left-0 bottom-0 h-500 w-auto md:h-500 md:w-auto"
        />
      </div>
    </div>
  );
};
