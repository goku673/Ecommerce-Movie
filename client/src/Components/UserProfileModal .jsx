import React from 'react';
import { X, LogOut, User, Mail, Camera } from 'lucide-react';

const UserProfileModal = ({ isOpen, user, handleOnClose, handleOnLogout }) => {
    
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={handleOnClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-gradient-to-b from-gray-900 to-gray-950 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold leading-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600" id="modal-title">
                    Perfil de Usuario
                  </h3>
                  <button
                    onClick={handleOnClose}
                    className="text-gray-400 hover:text-white focus:outline-none"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative group">
                      <img
                        src={user.image_profile || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ41A81cAVOwJ6e58SZMxg_Fh-VSwnYIWb3Bw&s'}
                        alt={user.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
                      />
                      {!user.image_profile && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-full">
                          <User className="h-16 w-16 text-gray-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Camera className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-purple-500" />
                    <p className="text-lg text-gray-300">{user.name}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-purple-500" />
                    <p className="text-lg text-gray-300">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-base font-medium text-white hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200"
              onClick={handleOnLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;



