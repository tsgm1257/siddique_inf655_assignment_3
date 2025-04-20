import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!taskName.trim() || !description.trim()) {
      setError("Task name and description cannot be empty.");
      return;
    }

    addTask({ name: taskName, description: description });
    setTaskName("");
    setDescription("");
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "20px",
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Enter Task Name"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ddd",
          borderRadius: "3px",
          boxSizing: "border-box",
        }}
      />
      <textarea
        placeholder="Enter Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ddd",
          borderRadius: "3px",
          boxSizing: "border-box",
          minHeight: "80px",
        }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "3px",
          cursor: "pointer",
        }}
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
