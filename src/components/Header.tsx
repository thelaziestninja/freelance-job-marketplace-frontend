import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/applications">Applications</Link>
      </nav>
    </header>
  );
};

export default Header;
