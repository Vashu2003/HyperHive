import React, { useState } from "react";
import Tasks from "./Tasks/Tasks";
import Timeline from "./Timeline/Timeline";
import Notes from "./Notes/Notes";
import Discussions from "./Discussions/Discussions";
import Meeting from "./Meeting/Meeting";

const tabs = ["Tasks", "Timeline", "Attachments", "Discussions", "Meetings"];

const MainSection = ({ groupId }) => {
  const [activeTab, setActiveTab] = useState("Tasks");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Tasks":
        return <Tasks groupId={groupId} />;
      case "Timeline":
        return <Timeline groupId={groupId} />;
      case "Attachments":
        return <Notes groupId={groupId} />;
      case "Discussions":
        return <Discussions groupId={groupId} />;
      case "Meetings":
        return <Meeting groupId={groupId} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark border-x border-border-light dark:border-border-dark rounded-2xl shadow-sm overflow-y-hidden">
      {/* Tab Navigation */}
      <div className="flex space-x-2 sm:space-x-4 px-4 py-2 overflow-x-auto scrollbar-thin scrollbar-thumb-muted-light dark:scrollbar-thumb-muted-dark shadow-md">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`text-m font-mono px-4 py-1.5 rounded-xl transition-all duration-200 whitespace-nowrap
              ${
                activeTab === tab
                  ? "bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark shadow-sm"
                  : "text-muted-foreground hover:text-text-light dark:hover:text-text-dark hover:bg-muted-light dark:hover:bg-muted-dark"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
  
      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto h-[540px]">
        {renderTabContent()}
      </div>
    </div>
  );  
};

export default MainSection;
