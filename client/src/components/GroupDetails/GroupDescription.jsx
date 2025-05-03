import React from "react";

const GroupDescription = ({ isEditing, groupData, setGroupData, group }) => (
  <div>
    {isEditing ? (
      <textarea
        value={groupData.description}
        onChange={(e) =>
          setGroupData({ ...groupData, description: e.target.value })
        }
        className="w-full p-2 rounded-xl text-sm bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark"
      />
    ) : (
      <p className="text-sm text-text-light dark:text-text-dark">
        {group.description || "No description provided."}
      </p>
    )}
  </div>
);

export default GroupDescription;
