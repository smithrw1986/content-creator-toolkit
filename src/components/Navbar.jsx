import React from "react";

function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem 1rem",
        backgroundColor: "#f1f1f1",
        borderRadius: "8px",
        marginBottom: "1.5rem",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: "bold", fontSize: "1.75rem" }}>
          Content Creator Toolkit
        </span>
        <span style={{ fontSize: "1.1rem", color: "#666" }}>
          Plan, schedule, and track your content with ease.
        </span>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={() => setActiveTab("ideas")}
          className={activeTab === "ideas" ? "active" : ""}
        >
          Ideas
        </button>
        <button
          onClick={() => setActiveTab("calendar")}
          className={activeTab === "calendar" ? "active" : ""}
        >
          Calendar
        </button>
        <button
          onClick={() => setActiveTab("engagement")}
          className={activeTab === "engagement" ? "active" : ""}
        >
          Engagement
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
