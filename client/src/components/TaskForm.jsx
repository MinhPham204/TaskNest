import { useState } from "react";

function TaskForm({ onSubmit, initialData }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [dueDate, setDueDate] = useState(initialData?.dueDate?.slice(0, 10) || "");
  const [status, setStatus] = useState(initialData?.status || "pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, dueDate, status });
    setTitle("");
    setDueDate("");
    setStatus("pending");
  };

  console.log("TaskForm loaded");

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tiêu đề nhiệm vụ *
          </label>
          <input
            type="text"
            placeholder="Nhập tiêu đề nhiệm vụ..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ngày hết hạn
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trạng thái
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="pending">Chưa hoàn thành</option>
            <option value="done">Đã hoàn thành</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        {initialData && (
          <button
            type="button"
            onClick={() => {
              setTitle("");
              setDueDate("");
              setStatus("pending");
            }}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
        )}
        <button 
          type="submit" 
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <span>{initialData ? "Cập nhật" : "Thêm"}</span>
          <span>{initialData ? "✏️" : "➕"}</span>
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
