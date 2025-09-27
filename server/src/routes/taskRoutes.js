const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
} = require("../controllers/taskControllers");

const router = express.Router();

router.post("/", createTask);          // Tạo mới
router.get("/", getTasks);             // Lấy danh sách (có filter + phân trang)
router.get("/stats", getTaskStats);    // Thống kê
router.get("/:id", getTaskById);       // Lấy chi tiết
router.put("/:id", updateTask);        // Cập nhật
router.delete("/:id", deleteTask);     // Xóa

module.exports = router;
