import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/loginForm/LoginForm";

type LoginProps = {
  onLogin: (email: string, password: string) => boolean;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = (email: string, password: string) => {
    if (onLogin(email, password)) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Login;
