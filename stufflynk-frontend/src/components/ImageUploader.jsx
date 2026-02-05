import React, { useRef } from 'react';

const ImageUploader = ({ label, currentImage, onImageChange, placeholder = "SL" }) => {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = () => {
    onImageChange(null);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
        {label}
      </label>
      
      <div className="flex items-center gap-4">
        {/* Preview */}
        <div 
          onClick={handleClick}
          className="w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-2 border-dashed border-gray-300 hover:border-cyan-500 transition-colors flex items-center justify-center bg-gray-50"
        >
          {currentImage ? (
            <img src={currentImage} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-gray-400">{placeholder}</span>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-cyan-500 text-white text-sm font-medium rounded-lg hover:bg-cyan-600 transition-colors"
          >
            {currentImage ? 'Cambiar' : 'Subir'} imagen
          </button>
          
          {currentImage && (
            <button
              onClick={handleRemove}
              className="px-4 py-2 text-red-500 text-sm font-medium hover:bg-red-50 rounded-lg transition-colors"
            >
              Eliminar
            </button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUploader;