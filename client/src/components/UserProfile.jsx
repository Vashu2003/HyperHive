import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function UserProfile() {
  const { user } = useAuth(); // assuming this returns null or undefined initially
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Load user data into form state when available
  React.useEffect(() => {
    if (user) {
      setFormData({ name: user.name || "", email: user.email || "" });
    }
  }, [user]);

  if (!user) {
    return <div className="p-4 text-sm text-muted-foreground">Loading user...</div>;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    // send formData to server (not implemented here)
    setIsEditing(false);
  };

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

      {/* Edit Form */}
      {isEditing ? (
        <div className="space-y-2">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark"
          />
          <button onClick={handleSave} className="px-4 py-2 rounded bg-primary text-white">
            Save
          </button>
        </div>
      ) : (
        <button onClick={() => setIsEditing(true)} className="px-4 py-2 rounded bg-primary text-white">
          Edit
        </button>
      )}
    </div>
  );
}

export default UserProfile;
