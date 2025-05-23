import React, { useState } from "react";
import Tasks from "./Tasks/Tasks";
import Timeline from "./Timeline";
import Notes from "./Notes/Notes";
import Discussions from "./Discussions/Discussions";
import Meeting from "./Meeting/Meeting";

const tabs = ["Tasks", "Timeline", "Notes", "Discussions", "Meetings"];

const MainSection = ({ groupId }) => {
  const [activeTab, setActiveTab] = useState("Tasks");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Tasks":
        return <Tasks groupId={groupId} />;
      case "Timeline":
        return <Timeline groupId={groupId} />;
      case "Notes":
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
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark border-x border-border-light dark:border-border-dark">
      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-border-light dark:border-border-dark px-4 py-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`text-sm font-mono px-3 py-1 rounded-xl ${
              activeTab === tab
                ? "bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark"
                : "text-muted-foreground hover:text-text-light dark:hover:text-text-dark"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default MainSection;
