import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import Select from "react-select";

const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      width: "100%",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "0.5rem 0.75rem",
      fontSize: "1rem",
      cursor: "pointer",
      backgroundColor: "#fff",
      boxSizing: "border-box",
    }}
    onClick={onClick}
    ref={ref}
  >
    <FaRegCalendarAlt style={{ marginRight: "0.5rem", color: "#888" }} />
    <span style={{ color: value ? "#000" : "#aaa" }}>
      {value || "Select a date"}
    </span>
  </div>
));

const EngagementTracker = ({ engagementLogs, setEngagementLogs }) => {
  const [date, setDate] = useState(new Date());
  const [platform, setPlatform] = useState("");
  const [views, setViews] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editPlatform, setEditPlatform] = useState("");
  const [editViews, setEditViews] = useState("");
  const [editLikes, setEditLikes] = useState("");
  const [editComments, setEditComments] = useState("");

  const platformOptions = [
    { value: "Facebook", label: "Facebook" },
    { value: "Instagram", label: "Instagram" },
    { value: "TikTok", label: "TikTok" },
    { value: "Twitter", label: "Twitter" },
    { value: "YouTube", label: "YouTube" },
    { value: "Other", label: "Other" },
  ];

  const formatDate = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // YYYY-MM-DD
  };

  const platformsToRender = [
    "Facebook",
    "Instagram",
    "TikTok",
    "Twitter",
    "YouTube",
    "Other",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLog = {
      id: Date.now(),
      date: formatDate(date), // Pass Date object to formatDate
      platform,
      views: parseInt(views) || 0,
      likes: parseInt(likes) || 0,
      comments: parseInt(comments) || 0,
    };

    setEngagementLogs((prevLogs) => [...prevLogs, newLog]);

    // Clear form
    // setPlatform("");
    setViews("");
    setLikes("");
    setComments("");

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setDate(today);
  };

  const handleDeleteLog = (id) => {
    setEngagementLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
  };

  const handleEditLog = (id) => {
    const logToEdit = engagementLogs.find((log) => log.id === id);
    if (logToEdit) {
      setEditingId(id);
      setEditDate(logToEdit.date);
      setEditPlatform(logToEdit.platform);
      setEditViews(logToEdit.views);
      setEditLikes(logToEdit.likes);
      setEditComments(logToEdit.comments);
    }
  };

  const handleSaveEdit = (id) => {
    setEngagementLogs((prevLogs) =>
      prevLogs.map((log) =>
        log.id === id
          ? {
              ...log,
              date: editDate,
              platform: editPlatform,
              views: parseInt(editViews) || 0,
              likes: parseInt(editLikes) || 0,
              comments: parseInt(editComments) || 0,
            }
          : log
      )
    );
    setEditingId(null);
  };

  return (
    <div>
      <h2>Engagement Tracker</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            Date:
          </label>
          <DatePicker
            selected={date}
            onChange={(dateObj) => setDate(dateObj)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            showPopperArrow={false}
            customInput={<CustomDateInput />}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Platform:
          </label>
          <Select
            options={platformOptions}
            value={platformOptions.find((option) => option.value === platform)}
            onChange={(selectedOption) => setPlatform(selectedOption.value)}
            placeholder="-- Select Platform --"
            isSearchable={false}
            styles={{
              control: (provided) => ({
                ...provided,
                borderRadius: "8px",
                borderColor: "#ccc",
                boxShadow: "none",
                "&:hover": { borderColor: "#aaa" },
              }),
              menu: (provided) => ({
                ...provided,
                borderRadius: "8px",
              }),
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <input
            type="number"
            placeholder="Views"
            value={views}
            onChange={(e) => setViews(e.target.value)}
            style={{ flex: 1 }}
          />
          <input
            type="number"
            placeholder="Likes"
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
            style={{ flex: 1 }}
          />
          <input
            type="number"
            placeholder="Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            style={{ flex: 1 }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "1rem",
            borderRadius: "8px",
            marginTop: "0.5rem",
            backgroundColor: "#555",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Log
        </button>
      </form>

      {platformsToRender.map((platformName) => {
        const platformLogs = engagementLogs.filter(
          (log) => log.platform === platformName
        );
        const groupedByDate = platformLogs.reduce((groups, log) => {
          if (!groups[log.date]) {
            groups[log.date] = [];
          }
          groups[log.date].push(log);
          return groups;
        }, {});

        return (
          <div
            key={platformName}
            className="youtube-logs-outer"
            style={{ marginBottom: "2rem" }}
          >
            <div className="youtube-logs-scroll">
              <h3 style={{ marginTop: 0 }}>{platformName} Logs</h3>
              {Object.keys(groupedByDate)
                .sort((a, b) => new Date(b) - new Date(a))
                .map((date) => (
                  <div key={date} style={{ marginBottom: "1.5rem" }}>
                    <h4>{date}</h4>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "0.75rem",
                      }}
                    >
                      {groupedByDate[date].map((log) => {
                        const isEditing = editingId === log.id;

                        return (
                          <div
                            key={log.id}
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "8px",
                              padding: "1rem",
                              backgroundColor: "#f9f9f9",
                            }}
                          >
                            {isEditing ? (
                              <>
                                <input
                                  type="date"
                                  value={editDate}
                                  onChange={(e) => setEditDate(e.target.value)}
                                  style={{
                                    display: "block",
                                    marginBottom: "0.5rem",
                                  }}
                                />
                                <select
                                  value={editPlatform}
                                  onChange={(e) =>
                                    setEditPlatform(e.target.value)
                                  }
                                  style={{
                                    display: "block",
                                    marginBottom: "0.5rem",
                                  }}
                                >
                                  <option value="">Select Platform</option>
                                  {platformOptions.map((option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                                <input
                                  type="number"
                                  placeholder="Views"
                                  value={editViews}
                                  onChange={(e) => setEditViews(e.target.value)}
                                  style={{
                                    display: "block",
                                    marginBottom: "0.5rem",
                                  }}
                                />
                                <input
                                  type="number"
                                  placeholder="Likes"
                                  value={editLikes}
                                  onChange={(e) => setEditLikes(e.target.value)}
                                  style={{
                                    display: "block",
                                    marginBottom: "0.5rem",
                                  }}
                                />
                                <input
                                  type="number"
                                  placeholder="Comments"
                                  value={editComments}
                                  onChange={(e) =>
                                    setEditComments(e.target.value)
                                  }
                                  style={{
                                    display: "block",
                                    marginBottom: "0.5rem",
                                  }}
                                />
                                <button onClick={() => handleSaveEdit(log.id)}>
                                  Save
                                </button>
                              </>
                            ) : (
                              <>
                                <div>Views: {log.views}</div>
                                <div>Likes: {log.likes}</div>
                                <div>Comments: {log.comments}</div>

                                <div
                                  style={{
                                    marginTop: "0.5rem",
                                    display: "flex",
                                    gap: "0.5rem",
                                  }}
                                >
                                  <button
                                    onClick={() => handleEditLog(log.id)}
                                    style={{
                                      padding: "0.3rem 0.7rem",
                                      backgroundColor: "#ffc107",
                                      color: "black",
                                      border: "none",
                                      borderRadius: "4px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteLog(log.id)}
                                    style={{
                                      padding: "0.3rem 0.7rem",
                                      backgroundColor: "#ff4d4d",
                                      color: "white",
                                      border: "none",
                                      borderRadius: "4px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EngagementTracker;
