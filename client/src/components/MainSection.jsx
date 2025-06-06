import React from "react";
import Tasks from "./Tasks/Tasks";
import Timeline from "./Timeline/Timeline";
import Notes from "./Notes/Notes";
import Discussions from "./Discussions/Discussions";
import Meeting from "./Meeting/Meeting";

const MainSection = ({ groupId, activeTab }) => {
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
    <section
      className="flex-1 overflow-y-auto h-[580px] md:h-[700px]"
      tabIndex={0}
      aria-live="polite"
    >
      {renderTabContent()}
    </section>
  );
};

export default MainSection;
