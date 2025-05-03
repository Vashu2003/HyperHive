import React from "react";

const NonMemberList = ({ nonMembers, handleAddMember }) => (
  <div>
    <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">Add Members</h3>
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
