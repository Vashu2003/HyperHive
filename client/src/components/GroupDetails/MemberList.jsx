import React from "react";

const MemberList = ({ members, isEditing, handleRemoveMember, group }) => {
  return (
    <div className="font-mono bg-muted-light dark:bg-muted-dark border border-border-light dark:border-border-dark rounded-xl p-4">
      <h3 className="text-lg font-semibold font-mono text-text-light dark:text-text-dark ">
        Members
      </h3>
      <ul className="list-disc pl-5 text-sm text-text-light dark:text-text-dark space-y-1">
        {members.map((member) => {
          if (!member) return null; // Safe check, though you should not get undefined members

          // Check if the current member is the group creator (owner)
          const isCreator = member._id === group.createdBy?._id;

          return (
            <li key={member._id} className="flex justify-between items-center">
              <span>{member.name}</span>
              {isEditing && !isCreator && (
                <button
                  onClick={() => handleRemoveMember(member._id)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Remove
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
