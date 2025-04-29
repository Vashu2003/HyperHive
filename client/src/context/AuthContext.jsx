import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context for authentication
const AuthContext = createContext();

// A custom hook to use the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default to false

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      // Optionally, verify token expiry (if it's a JWT token, for example)
      const isValidToken = verifyTokenExpiry(token);  // Custom function to check expiry
      if (isValidToken) {
        setIsAuthenticated(true); // User is authenticated
      } else {
        logout(); // Token is invalid, so log the user out
      }
    }
  }, []);

  // Function to verify token expiry
  const verifyTokenExpiry = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));  // Decode JWT
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decoded.exp > currentTime; // Check if token is expired
    } catch (error) {
      return false; // If any error occurs in decoding, return false
    }
  };

  const login = (token) => {
    localStorage.setItem("token", token); // Store token
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
