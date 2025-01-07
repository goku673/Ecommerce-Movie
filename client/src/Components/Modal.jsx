import React from "react";
import { X } from 'lucide-react';

const Modal = ({
  isModalOpen,
  handleAcepted,
  handleDeclined,
  buttonNameAcepted,
  ButtonNameDeclined,
  titleModal,
  handleCloseModal,
  children
}) => {
  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50 overflow-y-auto overflow-x-hidden"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-gradient-to-b from-gray-900 to-gray-950 rounded-lg shadow-lg border border-purple-500/20">
          <div className="flex items-center justify-between p-4 border-b border-purple-500/20 rounded-t">
            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">
              {titleModal}
            </h3>
            <button
              onClick={handleCloseModal}
              className="text-gray-400 bg-transparent hover:bg-purple-500/10 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors"
            >
              <X className="w-5 h-5" />
              <span className="sr-only">Cerrar modal</span>
            </button>
          </div>
          
          <div className="p-4 space-y-4 text-gray-300">
            {children}
          </div>

          <div className="flex items-center justify-end p-4 border-t border-purple-500/20 rounded-b">
            <button
              onClick={handleAcepted}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium transition-all duration-200"
            >
              {buttonNameAcepted}
            </button>
            <button
              onClick={handleDeclined}
              className="px-5 py-2.5 ms-3 rounded-lg border border-purple-500/50 text-gray-300 hover:bg-purple-500/10 font-medium transition-colors"
            >
              {ButtonNameDeclined}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;


