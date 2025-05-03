import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import GroupDetails from "../components/GroupDetails/GroupDetails";
import MainSection from "../components/MainSection";
import { useGroups } from "../context/GroupContext";

function Dashboard() {
  const { groupId } = useParams(); // 🧠 Get the groupId from the route
  const { groups } = useGroups();

  // 🎯 Find the group that matches the URL param
  const groupToShow = groups?.find((g) => g._id === groupId) || groups?.[0];
  console.log("groupToShow", groupToShow);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left: Sidebar */}
      <Sidebar />

      {/* Middle: Main section (tabs like tasks, notes, etc.) */}
      <MainSection />

      {/* Right: Group Details */}
      <GroupDetails group={groupToShow} memberData={groupToShow?.members || []} />
    </div>
  );
}

export default Dashboard;
