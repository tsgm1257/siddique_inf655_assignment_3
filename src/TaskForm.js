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
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Enter Task Name"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
      />
      <textarea
        placeholder="Enter Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;