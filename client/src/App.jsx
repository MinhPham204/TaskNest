import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Modern Navbar */}
        <nav className="bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">📋</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">TaskNest</span>
                </Link>
              </div>
              
              <div className="flex items-center space-x-8">
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Trang chủ
                </Link>
                <Link 
                  to="/tasks" 
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Nhiệm vụ
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                  <div className="text-center max-w-2xl mx-auto px-6">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-4xl">📋</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      Chào mừng đến TaskNest
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                      Quản lý công việc cá nhân hiệu quả và đơn giản
                    </p>
                    <Link 
                      to="/tasks" 
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Bắt đầu quản lý nhiệm vụ
                      <span className="ml-2">→</span>
                    </Link>
                  </div>
                </div>
              } 
            />
            <Route path="/tasks" element={<TaskPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
