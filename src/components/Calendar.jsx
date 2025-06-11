import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Rnd } from "react-rnd";
import Select from "react-select";

function CalendarView({ ideas, scheduledContent, setScheduledContent }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newContent, setNewContent] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);
  const [editContent, setEditContent] = useState("");

  const formattedDate = selectedDate.toISOString().split("T")[0];
  const [modalDate, setModalDate] = useState(null);

  const handleAddContent = () => {
    if (newContent.trim() === "") return;

    setScheduledContent((prev) => {
      const existing = prev[formattedDate] || [];
      return {
        ...prev,
        [formattedDate]: [...existing, newContent],
      };
    });

    setNewContent("");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          flexWrap: "wrap", // optional, for responsiveness
        }}
      >
        <h2 style={{ margin: 0 }}>Content Calendar</h2>

        <p
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            padding: "0.5rem 1rem",
            backgroundColor: "#e8f0ff",
            border: "1px solid #007bff",
            borderRadius: "6px",
            display: "inline-block",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          Selected Date:{" "}
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <Calendar
        onChange={setSelectedDate}
        onClickDay={(value) => {
          setSelectedDate(value);

          const dateString = value.toISOString().split("T")[0];
          const contentArray = scheduledContent[dateString] || [];

          if (contentArray.length > 0) {
            setModalDate(value); // open modal only if content exists
          } else {
            setModalDate(null);
          }
        }}
        value={selectedDate}
        locale="en-US"
        tileContent={({ date }) => {
          const dateString = date.toISOString().split("T")[0];
          const contentArray = scheduledContent[dateString] || [];
          if (contentArray.length > 0) {
            return (
              <div
                className="scheduled-content-container"
                style={{
                  marginTop: "0.25rem",
                  fontSize: "0.6rem",
                  textAlign: "center",
                  padding: "0 2px",
                  whiteSpace: "normal",
                  overflowY: "auto",
                  maxHeight: "100px",
                }}
              >
                {contentArray.map((item, index) => (
                  <div
                    key={index}
                    className="scheduled-content-item"
                    style={{}}
                  >
                    {item}
                  </div>
                ))}
              </div>
            );
          }
          return null;
        }}
      />

      <div style={{ marginTop: "1rem" }}>
        <h4>Scheduled Content</h4>
        {scheduledContent[formattedDate]?.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {scheduledContent[formattedDate].map((item, index) => {
              const isEditing = editingIndex === index;

              return (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    {isEditing ? (
                      <input
                        type="text"
                        className="scheduled-content-edit-input"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                      />
                    ) : (
                      <span>{item}</span>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => {
                            setScheduledContent((prev) => {
                              const updatedList = [...prev[formattedDate]];
                              updatedList[index] = editContent;
                              return {
                                ...prev,
                                [formattedDate]: updatedList,
                              };
                            });
                            setEditingIndex(null);
                            setEditContent("");
                          }}
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
                          onClick={() => {
                            setEditingIndex(null);
                            setEditContent("");
                          }}
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
                          onClick={() => {
                            setEditingIndex(index);
                            setEditContent(item);
                          }}
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
                              "Are you sure you want to delete this item?"
                            );
                            if (!confirmDelete) return;

                            setScheduledContent((prev) => {
                              const updatedList = prev[formattedDate].filter(
                                (_, i) => i !== index
                              );
                              return {
                                ...prev,
                                [formattedDate]: updatedList,
                              };
                            });
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
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No content scheduled for this day.</p>
        )}

        <div style={{ marginTop: "1rem" }}>
          <h4>Schedule Existing Content Idea</h4>
          {ideas.length === 0 ? (
            <p>No content ideas available. Add some on the Ideas tab first!</p>
          ) : (
            <Select
              options={ideas.map((idea) => ({
                value: idea.title,
                label: idea.title,
              }))}
              onChange={(selectedOption) => {
                if (selectedOption) {
                  const selectedIdeaTitle = selectedOption.value;
                  setScheduledContent((prev) => {
                    const existing = prev[formattedDate] || [];
                    return {
                      ...prev,
                      [formattedDate]: [...existing, selectedIdeaTitle],
                    };
                  });
                }
              }}
              placeholder="-- Select an idea to schedule --"
              menuPlacement="top"
              isSearchable={false}
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderRadius: "8px",
                  padding: "2px",
                  borderColor: "#ccc",
                  boxShadow: "none",
                }),
                menu: (provided) => ({
                  ...provided,
                  borderRadius: "12px",
                  border: "1px solid #aaa",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  overflow: "hidden",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? "#e6f0ff" : "#fff",
                  color: "#333",
                }),
              }}
            />
          )}
        </div>

        <div style={{ marginTop: "1rem" }}>
          <input
            type="text"
            placeholder="New content idea"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
          />
          <button onClick={handleAddContent} style={{ padding: "0.5rem 1rem" }}>
            Add to Calendar
          </button>
        </div>
      </div>
      {modalDate && (
        <Rnd
          default={{
            x: window.innerWidth / 2 - 250,
            y: window.innerHeight / 2 - 300,
            width: 500,
            height: 600,
          }}
          bounds="window"
          minWidth={200}
          minHeight={200}
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            zIndex: 1000,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* DRAG HANDLE */}
          <div className="modal-drag-handle">
            {modalDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          {/* MODAL CONTENT */}
          <div style={{ padding: "1rem", flexGrow: 1, overflowY: "auto" }}>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {(
                scheduledContent[modalDate.toISOString().split("T")[0]] || []
              ).map((item, index) => (
                <li
                  key={index}
                  style={{
                    padding: "0.25rem 0",
                    borderBottom: "1px solid #eee",
                    color: "#333",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setModalDate(null)}
            style={{
              padding: "0.6rem 0.85rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderTop: "1px solid #ccc",
              margin: "8px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <div className="resize-corner-indicator" />
        </Rnd>
      )}
    </div>
  );
}

export default CalendarView;
