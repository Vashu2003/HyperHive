import React, { useState } from "react";
import { Plus } from "lucide-react";

const roleColors = {
  admin: "bg-purple-200 text-purple-800 border-purple-300 dark:bg-purple-700 dark:text-purple-200",
  guest: "bg-gray-200 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200",
  member: "bg-blue-200 text-blue-800 border-blue-300 dark:bg-blue-700 dark:text-blue-200",
  // add more roles & colors here if needed
};

const NonMemberList = ({ nonMembers, handleAddMember }) => {
  const [showAll, setShowAll] = useState(false);
  const limit = 5;
  const displayedNonMembers = showAll ? nonMembers : nonMembers.slice(0, limit);

  return (
    <div className="font-mono bg-muted-light dark:bg-muted-dark border border-border-light dark:border-border-dark rounded-2xl p-4 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">Add Members</h3>
        {nonMembers.length > limit && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-hover-dark font-light transition"
          >
            {showAll ? "Show Less" : `Show All (${nonMembers.length})`}
          </button>
        )}
      </div>

      <ul className="space-y-2 text-sm text-text-light dark:text-text-dark">
        {displayedNonMembers.map((user) => (
          <li
            key={user._id}
            className="flex justify-between items-center px-2 py-1 rounded-md hover:bg-background-light dark:hover:bg-background-dark transition"
          >
            <div className="flex items-center space-x-2">
              <span>{user.name}</span>
              {/* Role badge */}
              {user.role && (
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${roleColors[user.role.toLowerCase()] || roleColors.member}`}
                >
                  {user.role}
                </span>
              )}
            </div>

            <button
              onClick={() => handleAddMember(user._id)}
              aria-label={`Add ${user.name}`}
              className="p-1 rounded-lg text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-hover-dark transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NonMemberList;
