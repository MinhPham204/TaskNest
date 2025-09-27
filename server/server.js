const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");



const allowedOrigins = [
  "https://tasknest-app.vercel.app", // domain chính
  "https://task-nest-inz7-pnhatminh2004-gmailcoms-projects.vercel.app/", // domain preview
  "http://localhost:5173" // để test local FE
];

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        origin.endsWith(".vercel.app") ||
        allowedOrigins.includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Routes
const taskRoutes = require("./src/routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("🚀 TaskNest API is running...");
});

// chỉ chạy listen khi chạy local, không chạy khi Vercel import
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app; // export app cho Vercel
