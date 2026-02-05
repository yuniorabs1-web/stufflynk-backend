import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ImageUploader from './ImageUploader';
import ColorPicker from './ColorPicker';

const SettingsPanel = ({ isOpen, onClose }) => {
  const { settings, updateSettings, resetSettings } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl overflow-y-auto animate-slide-in-right">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Personalizar StuffLynk</h2>
            <p className="text-xs text-gray-500">Adapta la plataforma a tu estilo</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetSettings}
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Restaurar valores por defecto"
            >
              <RotateCcw size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Logo y Nombre */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
              Identidad
            </h3>
            
            <ImageUploader
              label="Logo de la aplicación"
              currentImage={settings.logo}
              onImageChange={(logo) => updateSettings({ logo })}
              placeholder={settings.appName?.slice(0, 2) || 'SL'}
            />

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nombre de la app
              </label>
              <input
                type="text"
                value={settings.appName}
                onChange={(e) => updateSettings({ appName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none"
                placeholder="StuffLynk"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Eslogan
              </label>
              <input
                type="text"
                value={settings.slogan}
                onChange={(e) => updateSettings({ slogan: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none"
                placeholder="Trueque Digital"
              />
            </div>
          </section>

          {/* Colores */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
              Colores
            </h3>
            
            <ColorPicker
              label="Color del sidebar"
              value={settings.sidebarColor}
              onChange={(sidebarColor) => updateSettings({ sidebarColor })}
            />

            <ColorPicker
              label="Color primario (botones, acentos)"
              value={settings.primaryColor}
              onChange={(primaryColor) => updateSettings({ primaryColor })}
            />

            <ColorPicker
              label="Color de fondo"
              value={settings.backgroundColor}
              onChange={(backgroundColor) => updateSettings({ backgroundColor })}
            />
          </section>

          {/* Fondo personalizado */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
              Fondo personalizado
            </h3>
            
            <ImageUploader
              label="Imagen de fondo (opcional)"
              currentImage={settings.backgroundImage}
              onImageChange={(backgroundImage) => updateSettings({ backgroundImage })}
              placeholder="BG"
            />
            
            {settings.backgroundImage && (
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={settings.overlayEnabled}
                    onChange={(e) => updateSettings({ overlayEnabled: e.target.checked })}
                    className="rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
                  />
                  Aplicar overlay oscuro para mejor legibilidad
                </label>
              </div>
            )}
          </section>

          {/* Preview */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
              Vista previa
            </h3>
            <div 
              className="p-4 rounded-xl border-2 border-dashed border-gray-200"
              style={{ backgroundColor: settings.backgroundColor }}
            >
              <div 
                className="w-full h-32 rounded-lg flex flex-col items-center justify-center text-white"
                style={{ backgroundColor: settings.sidebarColor }}
              >
                {settings.logo ? (
                  <img src={settings.logo} alt="Logo" className="w-12 h-12 rounded-full object-cover mb-2" />
                ) : (
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-2"
                    style={{ backgroundColor: settings.primaryColor }}
                  >
                    {settings.appName?.slice(0, 2) || 'SL'}
                  </div>
                )}
                <span className="font-bold">{settings.appName}</span>
                <span className="text-xs opacity-75">{settings.slogan}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-lg font-semibold text-white transition-colors"
            style={{ backgroundColor: settings.primaryColor }}
          >
            Aplicar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;