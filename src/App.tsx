import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Banner from "./pages/Banner";
import ProfilePage from "./pages/Profile";
import { AvatarProvider } from "./content/AvatarContext";
import { Navigate } from "react-router-dom";

const App: React.FC = () => {
  const [users, setUsers] = useState<
    { email: string; password: string; username: string }[]
  >([]);

  const handleRegister = (newUser: {
    username: string;
    email: string;
    password: string;
  }) => {
    if (users.find((user) => user.email === newUser.email)) {
      alert("Email already registered!");
      return;
    }
    setUsers([...users, newUser]);
    alert("Registration successful!");
  };

  const handleLogin = (_email: string, _password: string): boolean => {
    const loginSuccessful = true;
    if (loginSuccessful) {
      localStorage.setItem("isLoggedIn", "true");

      return true;
    }
    return false;
  };

  return (
    <AvatarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route
            path="/register"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </AvatarProvider>
  );
};

export default App;
