import React from 'react';

const ConfirmModal = ({ message, onConfirm, onClose, confirmMessage }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
            onClick={onClose}
          >
            Back
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            onClick={onConfirm}
          >
            {confirmMessage}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
