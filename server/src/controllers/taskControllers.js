const Task = require("../models/Task");

// @desc    Tạo task mới
exports.createTask = async (req, res) => {
  try {
    const { title, status, dueDate } = req.body;
    const task = new Task({ title, status, dueDate });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Lấy danh sách task (có filter + phân trang)
exports.getTasks = async (req, res) => {
  try {
    const { status, dueDate, page = 1, limit = 5 } = req.query;

    const query = {};
    if (status) query.status = status;
    if (dueDate) {
      // tìm task có dueDate trong cùng ngày
      const start = new Date(dueDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(dueDate);
      end.setHours(23, 59, 59, 999);
      query.dueDate = { $gte: start, $lte: end };
    }

    const skip = (page - 1) * limit;

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(query);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      tasks,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Lấy chi tiết 1 task
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Cập nhật task
exports.updateTask = async (req, res) => {
  try {
    const { title, status, dueDate } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, status, dueDate },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Xóa task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Thống kê số nhiệm vụ hoàn thành / chưa hoàn thành
exports.getTaskStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
