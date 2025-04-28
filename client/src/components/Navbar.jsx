import { Moon, Sun } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth(); // Get the authentication state

  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-4 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark z-50">
      {/* Left Links: Conditional rendering based on authentication */}
      {isAuthenticated && (
        <ul className="flex space-x-8 text-sm font-medium">
          <li>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          </li>
        </ul>
      )}

      {/* Theme Toggle Button: Always visible in the top-right */}
      <button
        onClick={toggleTheme}
        className="ml-4 p-2 rounded-full transition-all absolute right-6 top-3"
      >
        <div className="relative w-6 h-6">
          <Sun
            className={`absolute transition-transform duration-300 ${theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}
          />
          <Moon
            className={`absolute transition-transform duration-300 ${theme === "light" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
          />
        </div>
      </button>
    </nav>
  );
}

export default Navbar;
