import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import Waves from "../components/Waves";
import FeatureMarquee from "../components/FeatureMarquee";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userData = await registerUser(name, email, password, role);
      login(userData.token);
      navigate("/");
    } catch (error) {
      console.error(
        "Signup failed:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  const handleGuestLogin = async () => {
    try {
      const userData = await loginUser("guest@example.com", "123456");
      login(userData.token);
      navigate("/");
    } catch (error) {
      console.error(
        "Guest login failed:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Guest login failed");
    }
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full h-full min-h-screen">
        {/* Left Side: Animation + Info */}
        <div className="flex-[4] relative bg-[#121212] text-white p-10 flex flex-col justify-center items-start backdrop-blur-md">
          <div className="absolute inset-0 z-0">
            <Waves
              lineColor="#ffffff33"
              backgroundColor="transparent"
              className="w-full h-full"
            />
          </div>
          {/* Blur overlay above waves */}
          <div className="absolute inset-0 z-5 backdrop-blur-md"></div>
          <div className="relative z-10 max-w-lg font-mono">
            <h1 className="text-5xl font-bold bg-primary-dark bg-clip-text text-transparent tracking-wide mb-4">
              HYPERHIVE
            </h1>
            <p className="text-lg">
              Collaborate, organize, and stay productive with your team.
              Streamline your workflow and boost team productivity.
            </p>
          </div>
          <FeatureMarquee />
        </div>

        {/* Right Side: Signup Form */}
        <div className="flex-[1] bg-white px-6 py-2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-center text-black">
            Sign Up
          </h2>
          <p className="text-sm text-center text-gray-500 mb-2">
            Create your account
          </p>

          <form onSubmit={handleSignup}>
            {/* Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm text-black font-medium"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-black px-2 py-2 mt-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 font-mono"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm text-black font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-black px-2 py-2 mt-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 font-mono"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm text-black font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-black px-2 py-2 mt-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 font-mono"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-black font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-black px-2 py-2 mt-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 font-mono"
                required
              />
            </div>
            {/* Role Selection */}
            <div className="mb-6">
              <label
                htmlFor="role"
                className="block text-sm text-black font-medium"
              >
                Select Your Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full text-black px-2 py-2 mt-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 font-mono"
                required
              >
                <option value="">Select a role</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">
                  Full Stack Developer
                </option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="Database Administrator">
                  Database Administrator
                </option>
                <option value="QA Engineer">QA Engineer</option>
                <option value="Mobile App Developer">
                  Mobile App Developer
                </option>
                <option value="Security Engineer">Security Engineer</option>
                <option value="Other">Others...</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-muted-dark text-white rounded-full hover:bg-background-dark transition-all font-mono"
            >
              Sign Up
            </button>
            <button
              onClick={handleGuestLogin}
              className="w-full py-3 mt-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-all font-mono"
            >
              Login as Guest
            </button>
          </form>

          {/* Link to Login */}
          <div className="mt-4 text-center">
            <p className="text-sm text-black font-mono">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
