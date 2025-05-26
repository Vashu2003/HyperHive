import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import Waves from "../components/Waves";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 👈
  const { login } = useAuth();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userData = await loginUser(email, password); // Call API

      login(userData.token); // Use the login function from AuthContext

      navigate("/"); // Redirect to dashboard
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      {/* Full-screen split container */}
      <div className="flex w-full h-full min-h-screen">
  
        {/* 🔵 Left Side - Animation + Info */}
        <div className="flex-[2] relative bg-gradient-to-b from-muted-dark to-background-dark text-white p-10 flex flex-col justify-center items-start">
          {/* Waves animation in background */}
          <div className="absolute inset-0 z-0">
            <Waves lineColor="#ffffff33" backgroundColor="transparent" className="w-full h-full" />
          </div>
  
          <div className="relative z-10 max-w-lg font-mono">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#f5d37c] to-[#d4af37] bg-clip-text text-transparent tracking-wide mb-4">
        HYPERHIVE
      </h1>
            <p className="text-lg">
              Collaborate, organize, and stay productive with your team.
              Streamline your workflow and boost team productivity.
            </p>
          </div>
        </div>
  
        {/* ⚪ Right Side - Login Form */}
        <div className="flex-[1] bg-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-center text-black">Login</h2>
          <p className="text-sm text-center text-gray-500 mb-6">Welcome Back</p>
  
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-black font-medium">Email</label>
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
              <label htmlFor="password" className="block text-sm text-black font-medium">Password</label>
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