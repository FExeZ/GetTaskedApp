// src/services/taskService.js

import axios from "axios";

const API_URL = "http://localhost:8080/tasks";

// Get tasks
export const getAllTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get task by id
export const getTaskById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create task

export const createTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

// Update task

export const updateTask = async (id, task) => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
};

// Delete task

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return "Task deleted successfully!";
};

// Exporting functions
const taskService = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService;
