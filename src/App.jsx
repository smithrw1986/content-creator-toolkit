import React, { useEffect, useState } from "react";
import CalendarView from "./components/Calendar";
import ContentIdeaForm from "./components/ContentIdeaForm.jsx";
import ContentIdeaList from "./components/ContentIdeaList";
import EngagementTracker from "./components/EngagementTracker";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  const [activeTab, setActiveTab] = useState("ideas");

  const [ideas, setIdeas] = useState(() => {
    const storedIdeas = localStorage.getItem("ideas");
    return storedIdeas ? JSON.parse(storedIdeas) : [];
  });

  const [scheduledContent, setScheduledContent] = useState(() => {
    const storedScheduled = localStorage.getItem("scheduledContent");
    return storedScheduled ? JSON.parse(storedScheduled) : {};
  });

  const addIdea = (idea) => {
    setIdeas((prevIdeas) => [...prevIdeas, idea]);
  };

  const deleteIdea = (id) => {
    setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea.id !== id));
  };

  const [engagementLogs, setEngagementLogs] = useState(() => {
    const storedLogs = localStorage.getItem("engagementLogs");
    return storedLogs ? JSON.parse(storedLogs) : [];
  });

  const handleIdeasDragEnd = (result) => {
    if (!result.destination) return;

    const newIdeas = Array.from(ideas);
    const [movedItem] = newIdeas.splice(result.source.index, 1);
    newIdeas.splice(result.destination.index, 0, movedItem);

    setIdeas(newIdeas);
  };

  useEffect(() => {
    localStorage.setItem("ideas", JSON.stringify(ideas));
  }, [ideas]);

  useEffect(() => {
    localStorage.setItem("scheduledContent", JSON.stringify(scheduledContent));
  }, [scheduledContent]);

  useEffect(() => {
    localStorage.setItem("engagementLogs", JSON.stringify(engagementLogs));
  }, [engagementLogs]);

  return (
    <div className="App">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={{ padding: "1rem" }}>
        {activeTab === "ideas" && (
          <>
            <ContentIdeaForm addIdea={addIdea} />
            <ContentIdeaList
              ideas={ideas}
              deleteIdea={deleteIdea}
              onDragEnd={handleIdeasDragEnd}
              setIdeas={setIdeas}
            />
          </>
        )}
        {activeTab === "calendar" && (
          <CalendarView
            ideas={ideas}
            scheduledContent={scheduledContent}
            setScheduledContent={setScheduledContent}
          />
        )}

        {activeTab === "engagement" && (
          <EngagementTracker
            engagementLogs={engagementLogs}
            setEngagementLogs={setEngagementLogs}
          />
        )}
      </main>
    </div>
  );
}

export default App;
