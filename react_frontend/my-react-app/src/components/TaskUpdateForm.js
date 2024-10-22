import React, { useState, useEffect } from "react";
import taskService from "../services/taskService";
import userService from "../services/userService";

const TaskUpdateForm = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    expirationDate: "",
    completed: false,
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await taskService.getAllTasks(); // Suponiendo que tienes un método para obtener todas las tareas
        setTasks(response);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const selectedTask = tasks.find(
      (task) => task.id === Number(selectedTaskId)
    );
    if (selectedTask) {
      const formattedDate = new Date(selectedTask.expirationDate)
        .toISOString()
        .split("T")[0];
      setTaskDetails({
        title: selectedTask.title,
        description: selectedTask.description,
        expirationDate: formattedDate,
        completed: selectedTask.completed,
      });
    }
  }, [selectedTaskId, tasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await taskService.updateTask(selectedTaskId, {
        title: taskDetails.title,
        description: taskDetails.description,
        expirationDate: taskDetails.expirationDate,
        completed: taskDetails.completed,
      });
      alert("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Update Task</h2>
      <div className="ContainerSelector">
        <label htmlFor="taskSelect">Select Task</label>
        <select
          id="taskSelect"
          value={selectedTaskId}
          onChange={(e) => setSelectedTaskId(e.target.value)}
          required
        >
          <option value="">Select a task</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.title}
            </option>
          ))}
        </select>
      </div>
      <div className="ContainerDescription">
        <label htmlFor="description">Task description</label>
        <input
          type="text"
          id="description"
          value={taskDetails.description}
          readOnly
        />
      </div>
      <div className="ContainerExpirationDate">
        <label htmlFor="expirationDate">Task expiration date</label>
        <input
          type="date"
          id="expirationDate"
          value={taskDetails.expirationDate}
          onChange={(e) =>
            setTaskDetails({ ...taskDetails, expirationDate: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label htmlFor="completed">Task Completed:</label>
        <input
          type="checkbox"
          id="completed"
          checked={taskDetails.completed}
          onChange={(e) =>
            setTaskDetails({ ...taskDetails, completed: e.target.checked })
          }
        />
      </div>
      <button type="submit">Update Task</button>
    </form>
  );
};

export default TaskUpdateForm;
