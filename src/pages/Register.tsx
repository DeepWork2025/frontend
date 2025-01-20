import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../components/registerForm/RegisterForm";

type RegisterProps = {
  onRegister: (user: {
    username: string;
    email: string;
    password: string;
  }) => void;
};

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const navigate = useNavigate();

  // if register successful, turn into login page
  const handleRegister = (user: {
    username: string;
    email: string;
    password: string;
  }) => {
    onRegister(user);
    alert("Registration successful! Redirecting to login...");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <RegisterForm onRegister={handleRegister} />
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
