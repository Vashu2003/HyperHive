import React, { useState } from "react";
import { Trash2 } from "lucide-react";

const roleColors = {
  admin: "bg-purple-200 text-purple-800 border-purple-300 dark:bg-purple-700 dark:text-purple-200",
  guest: "bg-gray-200 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200",
  member: "bg-blue-200 text-blue-800 border-blue-300 dark:bg-blue-700 dark:text-blue-200",
  // add more roles/colors as needed
};

const MemberList = ({ members, isEditing, handleRemoveMember, group }) => {
  const [showAll, setShowAll] = useState(false);

  const limit = 3;
  const displayedMembers = showAll ? members : members.slice(0, limit);

  return (
    <div className="font-mono bg-muted-light dark:bg-muted-dark border border-border-light dark:border-border-dark rounded-2xl p-4 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">Members</h3>
        {members.length > limit && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-hover-dark font-semibold tracking-tight transition"
          >
            {showAll ? "Show Less" : `Show All (${members.length})`}
          </button>
        )}
      </div>

      <ul className="space-y-2 text-sm text-text-light dark:text-text-dark">
        {displayedMembers.map((member) => {
          if (!member) return null; // Safety check

          const isCreator = member._id === group.createdBy?._id;

          return (
            <li
              key={member._id}
              className="flex justify-between items-center px-2 py-1 rounded-md hover:bg-background-light dark:hover:bg-background-dark transition"
            >
              <div className="flex items-center space-x-24 justify-between">
                <span>{member.name}</span>

                {/* Role badge */}
                {member.role && (
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${roleColors[member.role.toLowerCase()] || roleColors.member}`}
                  >
                    {member.role}
                  </span>
                )}

                {/* Creator badge */}
                {isCreator && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-yellow-400 bg-yellow-500 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100">
                    Admin
                  </span>
                )}
              </div>

              {isEditing && !isCreator && (
                <button
                  onClick={() => handleRemoveMember(member._id)}
                  className="text-red-500 text-xs hover:underline"
                  aria-label={`Remove ${member.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MemberList;
