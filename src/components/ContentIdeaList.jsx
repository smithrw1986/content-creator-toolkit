import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import React, { useState } from "react";

function ContentIdeaList({ ideas, deleteIdea, onDragEnd, setIdeas }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleEdit = (idea) => {
    setEditingId(idea.id);
    setEditTitle(idea.title);
    setEditDescription(idea.description);
  };

  const handleSave = () => {
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea.id === editingId
          ? { ...idea, title: editTitle, description: editDescription }
          : idea
      )
    );
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  return (
    <div>
      <h2>Content Ideas</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="ideas">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ listStyleType: "none", padding: 0 }}
            >
              {ideas.map((idea, index) => (
                <Draggable
                  key={idea.id}
                  draggableId={idea.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        padding: 0,
                        marginBottom: "0.5rem",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0.75rem 1rem",
                          backgroundColor: "#fff",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          minHeight: "60px",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        {/* Left side → content */}
                        <div
                          style={{
                            flex: "1 1 0",
                            minWidth: 0, // KEY PART
                            overflowWrap: "break-word",
                          }}
                        >
                          {" "}
                          {editingId === idea.id ? (
                            <>
                              <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                style={{
                                  width: "100%",
                                  padding: "0.25rem",
                                  marginBottom: "0.5rem",
                                }}
                              />
                              <textarea
                                value={editDescription}
                                onChange={(e) =>
                                  setEditDescription(e.target.value)
                                }
                                style={{
                                  width: "100%",
                                  padding: "0.25rem",
                                  backgroundColor: "#fff",
                                  color: "#333",
                                }}
                              />
                            </>
                          ) : (
                            <>
                              <h3 style={{ margin: "0 0 0.5rem" }}>
                                {idea.title}
                              </h3>
                              <p
                                style={{
                                  margin: 0,
                                  color: "#333",
                                  whiteSpace: "pre-wrap",
                                  overflowWrap: "break-word",
                                  wordWrap: "break-word",
                                }}
                              >
                                {idea.description}
                              </p>
                            </>
                          )}
                        </div>

                        {/* Right side → buttons */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1.5rem",
                            marginLeft: "1rem",
                          }}
                        >
                          {editingId === idea.id ? (
                            <>
                              <button
                                onClick={handleSave}
                                style={{
                                  backgroundColor: "#28a745",
                                  color: "white",
                                  border: "none",
                                  padding: "0.25rem 0.5rem",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                }}
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancel}
                                style={{
                                  backgroundColor: "#6c757d",
                                  color: "white",
                                  border: "none",
                                  padding: "0.25rem 0.5rem",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                }}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(idea)}
                                style={{
                                  backgroundColor: "#ffc107",
                                  color: "black",
                                  border: "none",
                                  padding: "0.25rem 0.5rem",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  const confirmDelete = window.confirm(
                                    "Are you sure you want to delete this idea?"
                                  );
                                  if (!confirmDelete) return;
                                  deleteIdea(idea.id);
                                }}
                                style={{
                                  backgroundColor: "#ff4d4d",
                                  color: "white",
                                  border: "none",
                                  padding: "0.25rem 0.5rem",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                }}
                              >
                                Delete
                              </button>
                            </>
                          )}

                          {/* Drag handle */}
                          <div
                            {...provided.dragHandleProps}
                            style={{
                              cursor: "grab",
                              fontSize: "1.5rem",
                              userSelect: "none",
                            }}
                          >
                            ☰
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default ContentIdeaList;
