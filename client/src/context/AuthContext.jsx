import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context for authentication
const AuthContext = createContext();

// A custom hook to use the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // <-- added loading state

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const isValidToken = verifyTokenExpiry(token);
      if (isValidToken) {
        setIsAuthenticated(true);
      } else {
        logout();
      }
    }

    setLoading(false); // <-- auth check is done
  }, []);

  // Function to verify token expiry
  const verifyTokenExpiry = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
