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


  return (
    <div className="overflow-x-hidden  flex flex-col md:flex-row min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark scrollbar-thin scrollbar-thumb-muted-dark dark:scrollbar-thumb-muted-light scrollbar-track-muted-light dark:scrollbar-track-muted-dark">
      
      {/* Left: Sidebar */}
      <aside className="md:w-64 bg-background-light dark:bg-background-dark">
        <Sidebar />
      </aside>
  
      {/* Middle: Main section (tabs like tasks, notes, etc.) */}
      <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
        <MainSection groupId={groupToShow?._id} />
      </main>
  
      {/* Right: Group Details */}
      <aside className="w-full md:w-80 md:px-5 mr-6 md:py-8 bg-background-light dark:bg-background-dark">
        <GroupDetails group={groupToShow} memberData={groupToShow?.members || []} />
      </aside>
  
    </div>
  );
}

export default Dashboard;
