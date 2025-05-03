import React from "react";

const MemberList = ({ members, memberData, isEditing, handleRemoveMember }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
        Members
      </h3>
      <ul className="list-disc pl-5 text-sm text-text-light dark:text-text-dark space-y-1">
        {members.map((memberId) => {
          const member = memberData?.find((m) => m._id === memberId);
          if (!member) return null;

          return (
            <li key={member._id} className="flex justify-between items-center">
              <span>{member.name}</span>
              {isEditing && (
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
