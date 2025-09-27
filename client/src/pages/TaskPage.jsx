import { useEffect, useState, useCallback } from "react";
import { getTasks, getTaskStats, createTask, updateTask, deleteTask } from "../services/api";
import TaskList from "../components/TaskList";
import Pagination from "../components/Pagination";
import TaskModal from "../components/TaskModal";
import DeleteModal from "../components/DeleteModal";
import { LuPlus, LuCircleCheck, LuClock   } from "react-icons/lu";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(5);
  const [stats, setStats] = useState({ done: 0, pending: 0 });
  
  // Modal states
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // dùng useCallback để tránh warning missing dependency
  const loadTasks = useCallback(async () => {
    const data = await getTasks({ page, limit, status: statusFilter, dueDate: dateFilter });
    setTasks(data.tasks);
    // backend trả về total & limit => tự tính totalPages
    const totalPagesCalc = Math.max(1, Math.ceil((data.total || 0) / (data.limit || limit)));
    setTotalPages(totalPagesCalc);
  }, [page, statusFilter, dateFilter, limit]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    (async () => {
      const data = await getTaskStats();
      // backend trả dạng [{ _id: 'done', count: n }, { _id: 'pending', count: m }]
      const map = data.reduce((acc, cur) => {
        acc[cur._id] = cur.count;
        return acc;
      }, {});
      setStats({ done: map.done || 0, pending: map.pending || 0 });
    })();
  }, []);

  const handleAddOrUpdate = async (task) => {
    if (editing) {
      await updateTask(editing._id, task);
      setEditing(null);
    } else {
      await createTask(task);
    }
    setPage(1);
    loadTasks(); // refresh danh sách
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      // nếu xóa có thể làm rỗng trang hiện tại, reset về trang 1 cho an toàn
      setPage(1);
      loadTasks(); // refresh danh sách
    } catch (error) {
      console.error('Error deleting task:', error);
      // Có thể thêm toast notification ở đây
      alert('Có lỗi xảy ra khi xóa nhiệm vụ. Vui lòng thử lại.');
    }
  };

  // Modal handlers
  const handleAddTask = () => {
    setEditing(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditing(task);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsTaskModalOpen(false);
    setIsDeleteModalOpen(false);
    setEditing(null);
    setTaskToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full px-30">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            TaskNest
          </h1>
          <p className="text-gray-600">Quản lý công việc cá nhân hiệu quả</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Chưa hoàn thành</p>
                <p className="text-3xl font-bold text-red-600">{stats.pending}</p>
              </div>
              <LuClock className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center"/>
               
             
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đã hoàn thành</p>
                <p className="text-3xl font-bold text-green-600">{stats.done}</p>
              </div>
              <LuCircleCheck className="text-green-500 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"/>
                
              
            </div>
          </div>
        </div>

        {/* Add Task Button */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Quản lý nhiệm vụ</h2>
              <p className="text-gray-600">Thêm, chỉnh sửa và theo dõi tiến độ công việc</p>
            </div>
            <button
              onClick={handleAddTask}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <LuPlus className="mr-2"/>
              Thêm nhiệm vụ mới
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Bộ lọc</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái
              </label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tất cả trạng thái</option>
                <option value="pending">Chưa hoàn thành</option>
                <option value="done">Đã hoàn thành</option>
              </select>
            </div>
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày hết hạn
              </label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setStatusFilter("");
                  setDateFilter("");
                  setPage(1);
                }}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Danh sách nhiệm vụ</h3>
          </div>
          <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
        </div>

        {/* Pagination */}
        <div className="flex justify-center ">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleAddOrUpdate}
        initialData={editing}
      />
      
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={() => handleDelete(taskToDelete?._id)}
        taskTitle={taskToDelete?.title}
      />
    </div>
  );
}
