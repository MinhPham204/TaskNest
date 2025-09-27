import axios from "axios";

const API_URL = "https://tasknest-backend.vercel.app/api"; // BE endpoint

// Lấy danh sách task với filter & phân trang
export const getTasks = async (params = {}) => {
  const res = await axios.get(API_URL, { params });
  return res.data;
};

// Thống kê (done/pending)
export const getTaskStats = async () => {
  const res = await axios.get(`${API_URL}/stats`);
  return res.data;
};

// Tạo mới task
export const createTask = async (task) => {
  const res = await axios.post(API_URL, task);
  return res.data;
};

// Cập nhật task
export const updateTask = async (id, task) => {
  const res = await axios.put(`${API_URL}/${id}`, task);
  return res.data;
};

// Xóa task
export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
