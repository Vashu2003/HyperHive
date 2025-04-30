import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const GroupDetails = ({ group, memberData }) => {
  // Debugging log to check if group and memberData are passed correctly
  console.log("Group Data:", group);
  console.log("Member Data:", memberData);

  if (!group) {
    return (
      <div className="p-4 text-sm font-mono text-muted-foreground">
        No group selected.
      </div>
    );
  }

  let createdDate = "Unknown date";
  try {
    createdDate = format(new Date(group.createdAt), "PP");
  } catch {
    // Fallback in case of invalid date format
  }

  const [memberNames, setMemberNames] = useState([]);

  // Only run this useEffect if group.members and memberData are valid
  useEffect(() => {
    if (group.members && Array.isArray(group.members) && memberData) {
      // Ensure memberData is an array before calling .find() on it
      const names = group.members.map((id) => {
        const member = memberData.find((m) => m._id === id);
        return member ? member.name : "Unknown Member"; // Fallback if member not found
      });
      setMemberNames(names);
    }
  }, [group.members, memberData]); // Add memberData as a dependency

  return (
    <aside className="w-full md:w-80 border-r border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark p-4 font-mono space-y-4">
      {/* Title */}
      <div>
        <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">
          {group.name}
        </h2>
        <p className="text-xs text-muted-foreground">Created on {createdDate}</p>
      </div>

      {/* Description */}
      <div>
        <p className="text-sm text-text-light dark:text-text-dark">
          {group.description || "No description provided."}
        </p>
      </div>

      {/* Metadata */}
      <div className="space-y-1 text-xs text-muted-foreground">
        <p>
          <span className="font-semibold">Group ID:</span> {group._id}
        </p>
        <p>
          <span className="font-semibold">Owner Name:</span> {group.createdBy.name} {/* Accessing the name of the owner */}
        </p>
        <p>
          <span className="font-semibold">Members:</span>{" "}
          {Array.isArray(group.members) ? group.members.length : "Unknown"}
        </p>

        {/* Display member names */}
        {memberNames.length > 0 && (
          <ul className="list-disc pl-5 text-[11px] text-text-light dark:text-text-dark">
            {memberNames.map((name, index) => (
              <li key={index}>{name}</li> // Using index here is acceptable as member names are unique
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default GroupDetails;
