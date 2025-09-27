import Modal from "./Modal";
import { LuTrash } from "react-icons/lu";

export default function DeleteModal({ isOpen, onClose, onConfirm, taskTitle }) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Xác nhận xóa nhiệm vụ"
      size="sm"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <div>
            <p className="text-gray-900 font-medium">Bạn có chắc chắn muốn xóa?</p>
            
          </div>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-800">
            <strong>Lưu ý:</strong> Hành động này không thể hoàn tác. Nhiệm vụ sẽ bị xóa vĩnh viễn.
          </p>
        </div>
        
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <span>Xóa</span>
            <LuTrash/>
          </button>
        </div>
      </div>
    </Modal>
  );
}
