import React, { useState } from "react";
import Tasks from "./Tasks";
import Calendar from "./Calendar";
import Notes from "./Notes";
import Discussions from "./Discussions";
import Meeting from "./Meeting";

const tabs = ["Tasks", "Calendar", "Notes", "Discussions", "Meetings"];

const MainSection = () => {
  const [activeTab, setActiveTab] = useState("Tasks");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Tasks":
        return <Tasks />;
      case "Calendar":
        return <Calendar />;
      case "Notes":
        return <Notes />;
      case "Discussions":
        return <Discussions />;
      case "Meetings":
        return <Meeting />;
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
