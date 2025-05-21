import { Moon, Sun, UserCircle, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import UserProfile from "./UserProfile";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowProfile(false);
    }
  }, [isAuthenticated]);

  const toggleProfile = () => setShowProfile((prev) => !prev);
  const closeProfile = () => setShowProfile(false);

  return (
    <>
      <nav className="h-12 border-border-light dark:border-border-dark top-0 left-0 right-0 flex justify-between items-center px-6 py-4 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark z-50">
        {/* Logo */}
        <div className="font-mono pl-12 text-xl">
          {isAuthenticated && <Link to="/">HyperHive</Link>}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-full hover:bg-muted-light dark:hover:bg-muted-dark transition relative"
          >
            <div className="relative w-6 h-6">
              <Sun
                className={`absolute transition-transform duration-300 ${
                  theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
                }`}
              />
              <Moon
                className={`absolute transition-transform duration-300 ${
                  theme === "light"
                    ? "-rotate-90 scale-0"
                    : "rotate-0 scale-100"
                }`}
              />
            </div>
          </button>
          {isAuthenticated && (
            <>
              <button
                onClick={toggleProfile}
                className="p-2 rounded-full hover:bg-muted-light dark:hover:bg-muted-dark transition"
              >
                <UserCircle className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Slide-out drawer */}
      {showProfile && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={closeProfile}
          ></div>

          {/* Drawer */}
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-background-light dark:bg-background-dark shadow-xl z-50 transition-transform transform translate-x-0">
            <div className="flex justify-between items-center p-4 border-b border-border-light dark:border-border-dark">
              <h2 className="text-lg font-semibold">Your Profile</h2>
              <button
                onClick={closeProfile}
                className="text-muted-foreground hover:text-text-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <UserProfile user={user} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
