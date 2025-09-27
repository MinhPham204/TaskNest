const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const Task = require("./src/models/Task");

// Load biến môi trường
dotenv.config();

const seedTasks = async () => {
  try {
    // Kết nối DB
    await connectDB();

    // Xóa tasks cũ
    await Task.deleteMany();
    console.log("🗑️ Old tasks removed");

    // Data mẫu phù hợp với model
  const sampleTasks = [
  { title: "Học Node.js cơ bản", status: "pending", dueDate: new Date("2025-09-30") },
  { title: "Viết báo cáo môn CSDL", status: "done", dueDate: new Date("2025-09-20") },
  { title: "Đi chợ cuối tuần", status: "pending", dueDate: new Date("2025-09-28") },
  { title: "Tập thể dục buổi sáng", status: "done", dueDate: new Date("2025-09-25") },
  { title: "Chuẩn bị thuyết trình nhóm", status: "pending", dueDate: new Date("2025-10-02") },
  { title: "Đọc tài liệu về MongoDB", status: "pending", dueDate: new Date("2025-09-29") },
  { title: "Dọn dẹp phòng trọ", status: "pending", dueDate: new Date("2025-09-27") },
  { title: "Gửi mail cho giảng viên", status: "done", dueDate: new Date("2025-09-24") },
  { title: "Hoàn thành project Task Manager", status: "pending", dueDate: new Date("2025-10-05") },
  { title: "Nộp bài tập trí tuệ nhân tạo", status: "pending", dueDate: new Date("2025-09-29") },
  { title: "Làm slide báo cáo nhóm", status: "pending", dueDate: new Date("2025-10-03") },
  { title: "Học bài kiểm tra Toán rời rạc", status: "pending", dueDate: new Date("2025-10-01") },
  { title: "Thanh toán tiền điện", status: "done", dueDate: new Date("2025-09-22") },
  { title: "Thanh toán tiền nước", status: "pending", dueDate: new Date("2025-09-29") },
  { title: "Đi tập gym buổi chiều", status: "pending", dueDate: new Date("2025-09-27") },
  { title: "Xem lại video lecture AI", status: "pending", dueDate: new Date("2025-09-28") },
  { title: "Mua quà sinh nhật bạn", status: "pending", dueDate: new Date("2025-10-04") },
  { title: "Làm lab môn An toàn mạng", status: "pending", dueDate: new Date("2025-09-30") },
  { title: "Đi phỏng vấn part-time", status: "pending", dueDate: new Date("2025-10-06") },
  { title: "Xem phim cuối tuần", status: "done", dueDate: new Date("2025-09-21") },
  { title: "Học cách sử dụng Docker", status: "pending", dueDate: new Date("2025-10-07") },
  { title: "Làm quen với GraphQL", status: "pending", dueDate: new Date("2025-10-08") },
  { title: "Ôn thi giữa kỳ CSDL", status: "pending", dueDate: new Date("2025-10-10") },
  { title: "Đi siêu thị mua đồ ăn", status: "done", dueDate: new Date("2025-09-26") },
  { title: "Cập nhật CV cá nhân", status: "pending", dueDate: new Date("2025-10-09") },
];


    // Thêm tasks
    await Task.insertMany(sampleTasks);
    console.log("✅ Sample tasks added!");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding tasks:", error);
    process.exit(1);
  }
};

seedTasks();
