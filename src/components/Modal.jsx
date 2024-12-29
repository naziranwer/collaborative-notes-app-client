import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={onClose}
          className="relative top-0 right-0 text-3xl text-red-400 hover:text-red-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
