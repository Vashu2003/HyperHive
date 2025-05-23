import React from "react";

const GroupHeader = ({ isEditing, groupData, setGroupData, group, createdDate }) => (
  <div className="font-mono">
    <h2 className="text-3xl font-bold mb-2 text-text-light dark:text-text-dark">
      {isEditing ? (
        <input
          type="text"
          value={groupData.name}
          onChange={(e) =>
            setGroupData({ ...groupData, name: e.target.value })
          }
          className="w-full p-2 rounded-xl text-lg mb-2 bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        group.name
      )}
    </h2>
    <p className="text-sm font-mono border px-2 rounded-xl w-fit border-border-light dark:border-border-dark bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark">
      Created on {createdDate}
    </p>
  </div>  
);

export default GroupHeader;
