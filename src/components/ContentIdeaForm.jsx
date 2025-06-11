import React, { useState } from "react";

function ContentIdeaForm({ addIdea }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") return; // Do not add empty ideas

    // Build new idea object
    const newIdea = {
      title,
      description,
      id: Date.now(), // simple unique ID
    };

    // Call the addIdea function from App.jsx
    addIdea(newIdea);

    // Clear form
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <div style={{ marginBottom: "0.5rem" }}>
        <input
          type="text"
          placeholder="Idea Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <textarea
          placeholder="Idea Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>
      <button type="submit" style={{ padding: "0.5rem 1rem" }}>
        Add Idea
      </button>
    </form>
  );
}

export default ContentIdeaForm;
