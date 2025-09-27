import axios from "axios";

// Backend origin (KHÔNG kèm /api)
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Dùng 1 instance duy nhất
export const api = axios.create({
  baseURL,
  withCredentials: true,
});

// ========== TASKS API ==========
// GET /api/tasks
export const getTasks = async (params = {}) => {
  const res = await api.get("/api/tasks", { params });
  return res.data;
};

// GET /api/tasks/stats
export const getTaskStats = async () => {
  const res = await api.get("/api/tasks/stats");
  return res.data;
};

// POST /api/tasks
export const createTask = async (task) => {
  const res = await api.post("/api/tasks", task);
  return res.data;
};

// PUT /api/tasks/:id
export const updateTask = async (id, task) => {
  const res = await api.put(`/api/tasks/${id}`, task);
  return res.data;
};

// DELETE /api/tasks/:id
export const deleteTask = async (id) => {
  await api.delete(`/api/tasks/${id}`);
};
