import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const api = axios.create({ baseURL, withCredentials: true });

// Lấy danh sách task với filter & phân trang
export const getTasks = async (params = {}) => {
  const res = await axios.get(baseURL, { params });
  return res.data;
};

// Thống kê (done/pending)
export const getTaskStats = async () => {
  const res = await axios.get(`${baseURL}/stats`);
  return res.data;
};

// Tạo mới task
export const createTask = async (task) => {
  const res = await axios.post(baseURL, task);
  return res.data;
};

// Cập nhật task
export const updateTask = async (id, task) => {
  const res = await axios.put(`${baseURL}/${id}`, task);
  return res.data;
};

// Xóa task
export const deleteTask = async (id) => {
  await axios.delete(`${baseURL}/${id}`);
};
