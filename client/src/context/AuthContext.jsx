import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserProfile } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const verifyTokenExpiry = (token) => {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
      } catch (error) {
        return false;
      }
    };

    const initializeAuth = async () => {
      if (token && verifyTokenExpiry(token)) {
        setIsAuthenticated(true);
        try {
          const profile = await getUserProfile();
          setUser(profile);
        } catch (err) {
          console.error("Failed to fetch user profile", err);
          logout();
        }
      } else {
        logout();
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    
    try {
      const profile = await getUserProfile();
      setUser(profile);
    } catch (err) {
      console.error("Failed to fetch user profile", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
