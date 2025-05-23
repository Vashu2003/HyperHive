import React from "react";

const GroupMetadata = ({ group }) => (
  <div className="space-y-1 text-m text-text-light dark:text-text-dark font-mono">
    <p className="text-m mb-4">
      <span className="text-m font-mono">ID:</span>
      <span className="font-bold px-2 py-1 border border-border-light dark:border-border-dark rounded-full bg-muted-light dark:bg-muted-dark">
        {group._id}
      </span>
    </p>
    <p className="text-m mb-4">
      <span className="text-m font-mono">Admin:</span>
      <span className="font-bold px-2 py-1 border border-border-light dark:border-border-dark rounded-full bg-muted-light dark:bg-muted-dark">
        {group.createdBy?.name}
      </span>
    </p>
  </div>
);

export default GroupMetadata;
