import React from "react";

const NonMemberList = ({ nonMembers, handleAddMember }) => (
  <div className="font-mono">
    <h3 className="text-m font-mono text-text-light dark:text-text-dark">
      Add Members
    </h3>
    <ul className="list-disc pl-5 text-sm text-text-light dark:text-text-dark space-y-1">
      {nonMembers.map((user) => (
        <li key={user._id} className="flex justify-between items-center">
          <span>{user.name}</span>
          <button
            onClick={() => handleAddMember(user._id)}
            className="text-blue-500 text-xs hover:underline"
          >
            Add
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default NonMemberList;
