import React from 'react';

const ColorPicker = ({ label, value, onChange }) => {
  const presetColors = [
    '#1e293b', '#0f172a', '#1f2937', '#111827', // Oscuros
    '#06b6d4', '#0891b2', '#0e7490', '#155e75', // Cyan
    '#10b981', '#059669', '#047857', '#065f46', // Verde
    '#f59e0b', '#d97706', '#b45309', '#92400e', // Ámbar
    '#ef4444', '#dc2626', '#b91c1c', '#991b1b', // Rojo
    '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', // Violeta
    '#ec4899', '#db2777', '#be185d', '#9d174d', // Rosa
  ];

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
        {label}
      </label>
      
      <div className="flex items-center gap-3">
        {/* Input color nativo */}
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200"
          />
        </div>

        {/* Texto del color */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono uppercase"
          placeholder="#000000"
        />
      </div>

      {/* Presets */}
      <div className="grid grid-cols-8 gap-2 mt-2">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`w-6 h-6 rounded-md transition-transform hover:scale-110 ${
              value === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;