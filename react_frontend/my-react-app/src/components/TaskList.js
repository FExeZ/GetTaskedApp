// src/components/TaskList.js
import React, { useEffect, useState } from "react";
import taskService from "../services/taskService";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 2; // Number of tasks per page

  useEffect(() => {
    taskService
      .getAllTasks() //
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Task to display
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Total pages to display
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <h2 className="task-list-title">Task List</h2>
      <div className="task-list-container">
        <ul className="task-list">
          {currentTasks.map((task) => (
            <li key={task.id} className="task-card">
              <h3>{task.title}</h3>
              <p>Description: {task.description}</p>
              <p>
                Expiration Date:{" "}
                {new Date(task.expirationDate).toLocaleDateString()}
              </p>
              <p>Status: {task.completed ? "Completed" : "Pending"}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
