import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import GroupDetails from "../components/GroupDetails/GroupDetails";
import MainSection from "../components/MainSection";
import { useGroups } from "../context/GroupContext";

function Dashboard({ activeTab, setActiveTab }) {
  const { groupId } = useParams();
  const { groups } = useGroups();

  const groupToShow = groups?.find((g) => g._id === groupId) || groups?.[0];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-transparent text-text-light dark:text-text-dark scrollbar-thin scrollbar-thumb-muted-dark dark:scrollbar-thumb-muted-light scrollbar-track-muted-light dark:scrollbar-track-muted-dark">

      {/* Sidebar: fixed width with subtle shadow */}
      <aside className="md:w-64 bg-transparent border-r border-border-light dark:border-border-dark shadow-md">
        <Sidebar />
      </aside>

      {/* Main Content: flexible grow, generous padding, max-width to avoid stretching too much on big screens */}
      <main className="flex-1 max-w-full md:max-w-4xl lg:max-w-5xl mx-auto overflow-y-auto">
        <MainSection groupId={groupToShow?._id} activeTab={activeTab} setActiveTab={setActiveTab} />
      </main>

      {/* Group Details: sticky on desktop, padding for breathing room, subtle border left */}
      <aside className="w-full md:w-80 md:sticky md:top-0 md:h-screen bg-transparent border-l border-border-light dark:border-border-dark overflow-y-auto overflow-x-hidden shadow-inner">
        <GroupDetails group={groupToShow} memberData={groupToShow?.members || []} />
      </aside>

    </div>
  );
}

export default Dashboard;
