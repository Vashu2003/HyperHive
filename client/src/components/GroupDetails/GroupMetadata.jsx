import React from "react";

const GroupMetadata = ({ group }) => (
  <div className="space-y-1 text-xs text-muted-foreground">
    <p><span className="font-semibold">Group ID:</span> {group._id}</p>
    <p><span className="font-semibold">Owner Name:</span> {group.createdBy?.name}</p>
    <p><span className="font-semibold">Members:</span> {group.members?.length || 0}</p>
  </div>
);

export default GroupMetadata;
