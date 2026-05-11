'use client';

import React from 'react';
import { HiPlus } from 'react-icons/hi';

interface ImageUploadProps {
  label?: string;
  value?: string;
  onUpload: (file: File) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  value,
  onUpload,
  className = '',
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChooseFile = () => {
    inputRef.current?.click();
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label}
        </label>
      )}

      <div className="flex items-start gap-3">
        {/* Upload Box */}
        <div
          onClick={handleChooseFile}
          className="
            w-24 h-24
            border-2 border-dashed border-gray-300
            rounded-lg
            flex items-center justify-center
            cursor-pointer
            hover:border-primary transition
            bg-white
          "
        >
          <HiPlus className="text-3xl text-gray-400" />
        </div>

        {/* Preview */}
        {value && (
          <div className=" h-24 rounded-lg overflow-hidden bg-primary-100">
            <img
              src={value}
              alt="preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onUpload(file);
          }
        }}
      />
    </div>
  );
};

export default ImageUpload;