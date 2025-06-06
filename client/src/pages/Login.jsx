import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import Waves from "../components/Waves";
import FeatureMarquee from "../components/FeatureMarquee";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userData = await loginUser(email, password);
      login(userData.token);
      navigate("/");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Login failed");
    }
  };

  // Guest Login Logic
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
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Full-screen split container */}
      <div className="flex w-full h-full min-h-screen">
        {/* Left Side - Animation + Info with backdrop blur */}
        <div className="flex-[4] relative bg-[#121212] text-white p-10 flex flex-col justify-center items-start backdrop-blur-md">
          {/* Waves animation in background */}
          <div className="absolute inset-0 z-0">
            <Waves
              lineColor="#ffffff33"
              backgroundColor="transparent"
              className="w-full h-full"
            />
          </div>
          {/* Blur overlay above waves */}
          <div className="absolute inset-0 z-5 backdrop-blur-md"></div>

          {/* Info Text */}
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

        {/* Right Side - Login Form */}
        <div className="flex-[1] bg-white p-10 flex flex-col justify-center rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-2 text-center text-black">
            Login
          </h2>
          <p className="text-sm text-center text-gray-500 mb-6">Welcome Back</p>

          <form onSubmit={handleLogin}>
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
                className="w-full text-black p-3 mt-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 font-mono"
                required
              />
            </div>

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
                className="w-full text-black p-3 mt-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 font-mono"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-muted-dark text-white rounded-full hover:bg-background-dark transition-all font-mono"
            >
              Login
            </button>
          </form>

          {/* Guest Login Button */}
          <button
            onClick={handleGuestLogin}
            className="w-full py-3 mt-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-all font-mono"
          >
            Login as Guest
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm font-mono text-black">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
