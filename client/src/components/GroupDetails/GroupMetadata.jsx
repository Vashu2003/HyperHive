import React from "react";

const GroupMetadata = ({ group }) => (
  <div className="space-y-1 text-m text-text-light dark:text-text-dark font-mono">
    <p className="text-xs">
      <span className="text-m font-mono">ID:</span> {group._id}
    </p>
    <p className="text-xs">
      <span className="text-m font-mono">Admin:</span> {group.createdBy?.name}
    </p>
  </div>
);

export default GroupMetadata;
