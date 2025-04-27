import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark flex items-center justify-center">
      <div className="w-full max-w-sm p-6 dark:bg-muted-dark bg-muted-light rounded-xl dark:border dark:border-border-light border border-border-dark shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>

        <form onSubmit={handleLogin}>
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 dark:bg-background-light dark:text-text-light bg-background-dark text-white rounded-xl hover:bg-muted-dark dark:hover:bg-muted-light transition-all"
          >
            Login
          </button>
        </form>

        {/* Sign-up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
