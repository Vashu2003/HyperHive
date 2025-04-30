import React from "react";
import Sidebar from "../components/Sidebar";
import GroupDetails from "../components/GroupDetails";
import { useGroups } from "../context/GroupContext"; // Assuming context provides selectedGroup

function Dashboard() {
  const { groups } = useGroups();
  const selectedGroup = groups?.[0]; // Replace with actual selection logic

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left: Group Details */}
      <GroupDetails group={selectedGroup} />

      {/* Middle: Placeholder for now */}
      <main className="flex-1 p-4 bg-muted-light dark:bg-muted-dark">
        <h1 className="text-xl font-mono text-text-light dark:text-text-dark">
          Select a project to get started.
        </h1>
      </main>

      {/* Right: Sidebar */}
      <Sidebar />
    </div>
  );
}

export default Dashboard;
