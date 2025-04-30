import React from "react";
import Sidebar from "../components/Sidebar";
import GroupDetails from "../components/GroupDetails";
import MainSection from "../components/MainSection";
import { useGroups } from "../context/GroupContext";

function Dashboard() {
  const { groups, selectedGroup } = useGroups(); // Replace with actual logic when ready
  const groupToShow = selectedGroup || groups?.[0]; // Fallback if no group is selected

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left: Sidebar */}
      <Sidebar />

      {/* Middle: Main section (tabs like tasks, notes, etc.) */}
      <MainSection />

      {/* Right: Group Details */}
      <GroupDetails group={groupToShow} />
    </div>
  );
}

export default Dashboard;
