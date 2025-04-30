import { Moon, Sun, LogOut, UserCircle } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth(); // Access auth context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="top-0 left-0 right-0 flex justify-between items-center px-6 py-4 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark z-50">
      {/* Left: Logo or Links */}
      <div className="font-mono pl-12 text-xl">
        {isAuthenticated && (
            <Link to="/">
              HyperHive
            </Link>
        )}
      </div>

      {/* Right: Profile + Theme Toggle + Logout */}
      <div className="flex items-center space-x-4">
        {isAuthenticated && (
          <>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 p-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark  border-border-dark dark:border-border-light rounded-xl hover:bg-muted-light dark:hover:bg-muted-dark transition-all text-sm"
            >
              <LogOut className="w-6 h-6" />
            </button>

            {/* Profile Icon */}
            <button className="p-2 rounded-full hover:bg-muted-light dark:hover:bg-muted-dark transition">
              <UserCircle className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Theme Toggle Button */}
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
                theme === "light" ? "-rotate-90 scale-0" : "rotate-0 scale-100"
              }`}
            />
          </div>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

// import { Moon, Sun, LogOut } from "lucide-react";
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useTheme } from "../context/ThemeContext";
// import { useAuth } from "../context/AuthContext";

// function Navbar() {
//   const { theme, toggleTheme } = useTheme();
//   const { isAuthenticated, logout } = useAuth(); // Access auth context
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout(); // Log the user out and remove token from localStorage
//     navigate("/login"); // Redirect to login page
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-4 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark z-50">
//       {/* Left Links: Conditional rendering based on authentication */}
//       {isAuthenticated && (
//         <ul className="flex space-x-8 text-sm font-medium">
//           <Link to="/dashboard" className="hover:underline">
//             Dashboard
//           </Link>
//         </ul>
//       )}

//       {/* Theme Toggle Button: Always visible in the top-right */}
//       <button
//         onClick={toggleTheme}
//         className="ml-4 p-2  transition-all absolute right-6 top-3"
//       >
//         <div className="relative w-6 h-6">
//           <Sun
//             className={`absolute transition-transform duration-300 ${
//               theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
//             }`}
//           />
//           <Moon
//             className={`absolute transition-transform duration-300 ${
//               theme === "light" ? "-rotate-90 scale-0" : "rotate-0 scale-100"
//             }`}
//           />
//         </div>
//       </button>
      
//     </nav>
//   );
// }

// export default Navbar;
