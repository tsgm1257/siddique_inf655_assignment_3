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
    <div>
      <h2>Task for Today</h2>
      <div>
        <input
          type="text"
          placeholder="Search Tasks"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={handleSort}>Sort by Name</button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            {task.taskName} - {task.taskDescription}
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this task?")
                ) {
                  deleteTask(task.id);
                }
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
