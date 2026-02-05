import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme debe usarse dentro de ThemeProvider');
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [settings, setSettings] = useLocalStorage('stufflynk-settings-v2', {
    // Identidad
    appName: 'StuffLynk',
    slogan: 'Ecosistema de Intercambio',
    logo: null,
    favicon: null,
    
    // Colores - Paleta profesional por defecto
    sidebarColor: '#0f172a', // Slate 900 - más elegante
    primaryColor: '#0ea5e9', // Sky 500 - moderno
    secondaryColor: '#6366f1', // Indigo 500
    accentColor: '#10b981', // Emerald 500 - para éxitos
    dangerColor: '#ef4444', // Red 500
    
    // Layout
    sidebarWidth: '18rem', // Más ancho para logo grande
    sidebarCollapsed: false,
    borderRadius: '1rem', // Más moderno
    fontScale: 'medium', // small, medium, large
    
    // Features
    darkMode: false,
    animations: true,
    compactMode: false,
    
    // Background
    backgroundImage: null,
    overlayEnabled: true,
    overlayOpacity: 0.15,
  });

  const [sidebarOpen, setSidebarOpen] = useState(!settings.sidebarCollapsed);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const toggleDarkMode = () => {
    updateSettings({ darkMode: !settings.darkMode });
  };

  const resetSettings = () => {
    setSettings({
      appName: 'StuffLynk',
      slogan: 'Ecosistema de Intercambio',
      logo: null,
      favicon: null,
      sidebarColor: '#0f172a',
      primaryColor: '#0ea5e9',
      secondaryColor: '#6366f1',
      accentColor: '#10b981',
      dangerColor: '#ef4444',
      sidebarWidth: '18rem',
      sidebarCollapsed: false,
      borderRadius: '1rem',
      fontScale: 'medium',
      darkMode: false,
      animations: true,
      compactMode: false,
      backgroundImage: null,
      overlayEnabled: true,
      overlayOpacity: 0.15,
    });
  };

  // Valores computados
  const isCompact = settings.compactMode;
  const radiusClass = {
    small: 'rounded-lg',
    medium: 'rounded-xl',
    large: 'rounded-2xl'
  }[settings.borderRadius] || 'rounded-xl';

  return (
    <ThemeContext.Provider value={{ 
      settings, 
      updateSettings, 
      resetSettings,
      sidebarOpen,
      toggleSidebar,
      toggleDarkMode,
      isCompact,
      radiusClass
    }}>
      {children}
    </ThemeContext.Provider>
  );
};