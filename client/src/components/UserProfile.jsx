import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function UserProfile() {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (user) {
      // preload data or preferences if needed
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="p-4 text-sm text-muted-light dark:text-muted-dark font-mono">
        Loading user...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 text-sm text-muted-light dark:text-muted-dark font-mono">
        No user found. Please log in.
      </div>
    );
  }

  return (
    <div className="p-6 font-mono space-y-6 rounded-2xl border border-border-light dark:border-border-dark shadow-lg
      bg-background-light/95 dark:bg-background-dark/95
      backdrop-blur-sm w-[90vw] max-w-md relative"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-text-light dark:text-text-dark">
          Your Profile
        </h2>
      </div>

      {/* Profile Info */}
      <div className="flex items-center gap-4 rounded-full bg-muted-light dark:bg-muted-dark">
        <div className="w-16 h-16 rounded-full bg-primary text-background-light dark:bg-primary-dark dark:text-background-dark flex items-center justify-center text-2xl font-bold uppercase shadow-md">
          {user.name?.charAt(0) ?? "U"}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-light dark:text-text-dark">
            {user.name}
          </h2>
          <p className="text-sm text-text-light dark:text-text-dark">{user.email}</p>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-error/10 dark:bg-error-dark/20 text-error dark:text-error-dark hover:bg-error/20 dark:hover:bg-error-dark/40 rounded-xl transition font-mono"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default UserProfile;
