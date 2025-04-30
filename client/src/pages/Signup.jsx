import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
        const userData = await registerUser(name, email, password);
        console.log("Registered user:", userData);
  
        login(userData.token);
  
        navigate("/");
      } catch (error) {
        console.error("Signup failed:", error.response?.data?.message || error.message);
        alert(error.response?.data?.message || "Signup failed");
      }
    };


  return (
    <div className="min-h-[90vh] bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark flex items-center justify-center">
      <div className="w-full max-w-sm p-6 dark:bg-muted-dark bg-muted-light rounded-xl dark:border dark:border-border-light border border-border-dark shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <form onSubmit={handleSignup}>
          {/* Name Input */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-2 border border-border-dark bg-muted-light dark:border-border-light rounded-md dark:bg-muted-dark dark:text-text-dark focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-border-dark bg-muted-light dark:border-border-light rounded-md dark:bg-muted-dark dark:text-text-dark focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-border-dark bg-muted-light dark:border-border-light rounded-md dark:bg-muted-dark dark:text-text-dark focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-border-dark bg-muted-light dark:border-border-light rounded-md dark:bg-muted-dark dark:text-text-dark focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 dark:bg-background-light dark:text-text-light bg-background-dark text-white rounded-xl hover:bg-muted-dark dark:hover:bg-muted-light transition-all"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
