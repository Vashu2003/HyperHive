import React from "react";

const GroupHeader = ({ isEditing, groupData, setGroupData, group, createdDate }) => (
  <div className="font-mono">
    <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">
      {isEditing ? (
        <input
          type="text"
          value={groupData.name}
          onChange={(e) =>
            setGroupData({ ...groupData, name: e.target.value })
          }
          className="w-full p-2 rounded-xl text-sm bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        group.name
      )}
    </h2>
    <p className="text-xs text-text-light dark:text-text-dark">
      Created on {createdDate}
    </p>
  </div>  
);

export default GroupHeader;
