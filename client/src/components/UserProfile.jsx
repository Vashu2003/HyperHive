import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth(); // Get user details from context

  // Load user data into form state when available
  useEffect(() => {
    if (user) {
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="p-4 text-sm text-muted-foreground">Loading user...</div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        No user found. Please log in.
      </div>
    );
  }

  return (
    <div className="p-4 font-mono space-y-4">
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className="w-16 h-16 bg-muted-light dark:bg-muted-dark rounded-full flex items-center justify-center text-xl">
          {user.name?.[0] ?? "U"}
        </div>
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-muted-light dark:bg-muted-dark text-red-500 dark:text-red-400 hover:text-red-600 rounded-xl hover:bg-muted-light/70 dark:hover:bg-muted-dark/70 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default UserProfile;
