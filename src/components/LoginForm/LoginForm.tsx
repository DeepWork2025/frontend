import React, { useState } from "react";
import { Link } from "react-router-dom";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);

    validateField(email, "email", "Email cannot be blank");
    validateField(password, "password", "Password cannot be blank");
  };

  const validateField = (value: string, field: string, message: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: value.trim() === "" ? message : "",
    }));
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>, field: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      validateField(e.target.value, field, `${field} cannot be blank`);
    };

  return (
    <div className="flex h-screen">
      {/* left */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-red-400 text-white px-10">
        <h1 className="text-3xl font-bold mb-4">Deep Work</h1>
        <img
          src="/images/illustration.svg"
          alt="Illustration"
          className="w-64 h-64"
        />
        <p className=" text-lg text-center mt-4">
          Welcome back! <br />
          Please log in to continue.
        </p>
      </div>

      {/* right  */}
      <div className="flex flex-col justify-center w-1/2 px-12 bg-white ">
        <div className="text-left mb-6">
          <h2 className="text-2xl font-semibold">Sign In</h2>
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-red-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* social media */}
        <div className="flex space-x-4 mb-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-md shadow hover:bg-gray-100">
            <img
              src="https://img.icons8.com/color/30/000000/google-logo.png"
              alt="google"
            />
            <span>Sign In</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white border rounded-md shadow hover:bg-blue-700">
            <img
              src="https://img.icons8.com/ios-filled/30/ffffff/facebook-new.png"
              alt="facebook"
            />
            <span>Sign In</span>
          </button>
        </div>

        <div className="text-center text-gray-500 mb-4">Or</div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email  */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="abc@gmail.com"
              value={email}
              onChange={handleInputChange(setEmail, "email")}
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password  */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange(setPassword, "password")}
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* submit */}
          <button
            type="submit"
            className="w-full bg-red-400 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
