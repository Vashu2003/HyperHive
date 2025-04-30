import React from "react";
import { format } from "date-fns";

const GroupDetails = ({ group, memberData }) => {
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
    // fallback if date parsing fails
  }

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
          <span className="font-semibold">Owner ID:</span> {group.createdBy}
        </p>
        <p>
          <span className="font-semibold">Members:</span>{" "}
          {Array.isArray(group.members) ? group.members.length : "Unknown"}
        </p>

        {/* Display member IDs */}
        {Array.isArray(group.members) && group.members.length > 0 && (
          <ul className="list-disc pl-5 text-[11px] text-text-light dark:text-text-dark">
            {group.members.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default GroupDetails;
