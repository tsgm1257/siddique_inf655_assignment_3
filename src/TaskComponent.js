import React, { useState, useEffect } from "react";

const TaskComponent = ({ tasks, deleteTask }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedTasks, setSortedTasks] = useState([...tasks]);

  useEffect(() => {
    setSortedTasks([...tasks]);
  }, [tasks]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = () => {
    const sorted = [...sortedTasks].sort((a, b) => {
      const nameA = a.taskName || "";
      const nameB = b.taskName || "";
      return nameA.localeCompare(nameB);
    });
    setSortedTasks(sorted);
  };

  const filteredTasks = sortedTasks.filter(
    (task) =>
      task &&
      task.taskName &&
      task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>Task for Today</h2>
      <div
        style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}
      >
        <input
          type="text"
          placeholder="Search Tasks"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: "8px",
            marginRight: "10px",
            border: "1px solid #ddd",
            borderRadius: "3px",
            flexGrow: 1,
          }}
        />
        <button
          onClick={handleSort}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Sort by Name
        </button>
      </div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            style={{
              padding: "10px",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{task.taskName}</strong> - {task.taskDescription}
            </div>
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this task?")
                ) {
                  deleteTask(task.id);
                }
              }}
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                padding: "8px 12px",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskComponent;
