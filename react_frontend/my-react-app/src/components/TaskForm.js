import React, { useState, useEffect } from "react";
import taskService from "../services/taskService";
import userService from "../services/userService";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [expirationDate, setExpirationDate] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getUsers();
        // Verifying that the response is an array
        if (Array.isArray(response)) {
          // Mapping users names
          const userNames = response.map((user) => ({
            id: user.id,
            name: user.name,
          }));
          setUsers(userNames);
        } else {
          console.error("Response is not an array:", response);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate date and user
    if (!expirationDate || !userId) {
      console.error("Expiration date and user are required");
      return;
    }

    // YYYY-MM-DD
    const formattedExpirationDate = new Date(expirationDate)
      .toISOString()
      .split("T")[0];
    console.log("Form Submitted with data:", {
      title,
      description,
      completed,
      expirationDate: formattedExpirationDate,
      user: { id: userId },
    });
    try {
      const newTask = {
        title,
        description,
        completed,
        expirationDate: formattedExpirationDate,
        user: { id: Number(userId) },
      };
      await taskService.createTask(newTask);
      setTitle("");
      setDescription("");
      setCompleted(false);
      setExpirationDate("");
      setUserId("");
    } catch (e) {
      console.error("Error creating task:", e);
      alert("Error creating task. Please try again.");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Create Task</h2>
      <div className="ContainerTitle">
        <label htmlFor="title">Task Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="ContainerDescription">
        <label htmlFor="description">Task description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="ContainerCompleted">
        <label htmlFor="completed">Task completed:</label>
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
      </div>
      <div className="ContainerDate">
        <label htmlFor="expirationDate">Task Expiration date:</label>
        <input
          type="date"
          id="expirationDate"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          required
        />
      </div>
      <div className="ContainerUser">
        <label htmlFor="userTask">Task user:</label>
        <select
          id="userTask"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} {/* Name only */}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TaskForm;
