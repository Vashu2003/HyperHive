import { Moon, Sun, UserCircle, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import UserProfile from "./UserProfile";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import GooeyNav from "./GooeyNav";

const tabs = ["Tasks", "Timeline", "Attachments", "Discussions", "Meetings"];

function Navbar({ activeTab, setActiveTab }) {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) setShowProfile(false);
  }, [isAuthenticated]);

  const toggleProfile = () => setShowProfile((prev) => !prev);
  const closeProfile = () => setShowProfile(false);

  const gooeyTabs = tabs.map((tab) => ({ label: tab, href: "#" }));
  const activeTabIndex = tabs.indexOf(activeTab);
  const handleTabChange = (index) => setActiveTab(tabs[index]);

  return (
    <>
      <nav className="h-14 px-6 flex items-center justify-between backdrop-blur-md border-b border-border-light dark:border-border-dark shadow-sm z-50 relative">
        {/* Logo */}
        <div className="font-mono text-xl tracking-wide pl-12">
          {isAuthenticated && (
            <Link to="/" className="font-bold transition">
              HyperHive
            </Link>
          )}
        </div>

        {/* Center: GooeyNav */}
        <div className="flex justify-center items-center flex-1">
          <GooeyNav
            items={gooeyTabs}
            initialActiveIndex={activeTabIndex}
            setActiveIndex={handleTabChange}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted-light dark:hover:bg-muted-dark transition"
            aria-label="Toggle Theme"
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
            <button
              onClick={toggleProfile}
              className="p-2 rounded-full hover:bg-muted-light dark:hover:bg-muted-dark transition"
              aria-label="User Profile"
            >
              <UserCircle className="w-6 h-6" />
            </button>
          )}
        </div>
      </nav>

      {/* Profile Modal */}

      <Modal isOpen={showProfile} onClose={closeProfile}>
        <UserProfile />
      </Modal>
    </>
  );
}

export default Navbar;
