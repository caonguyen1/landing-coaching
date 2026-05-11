'use client';

import React from 'react';
import { HiX } from 'react-icons/hi';

interface AdminModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}

const AdminModal: React.FC<AdminModalProps> = ({
  open,
  title,
  onClose,
  children,
  width = 'max-w-lg',
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className={`
            relative
            bg-white
            rounded-2xl
            shadow-xl
            w-full
            ${width}
            animate-fadeIn
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-300">
            <h2 className="text-lg font-semibold">
              {title}
            </h2>

            <button
              onClick={onClose}
              className="
                w-9 h-9
                rounded-lg
                flex items-center justify-center
                hover:bg-gray-100
                transition
              "
            >
              <HiX size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;