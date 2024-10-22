// src/App.js
import React from "react";
import TaskList from "./components/TaskList";
import "./css/styles.css";
import TaskForm from "./components/TaskForm";
import TaskUpdateForm from "./components/TaskUpdateForm";

const App = () => {
  return (
    <div className="app-container">
      <div className="form-container">
        <TaskForm />
        <TaskUpdateForm />
      </div>
      <TaskList />
    </div>
  );
};

export default App;
