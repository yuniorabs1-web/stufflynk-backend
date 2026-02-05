import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  RefreshCw,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const { settings, sidebarOpen, toggleSidebar } = useTheme();

  const menuItems = [
    { id: 'resumen', label: 'Resumen', icon: LayoutDashboard, badge: null },
    { id: 'usuarios', label: 'Usuarios', icon: Users, badge: '12' },
    { id: 'inventario', label: 'Inventario', icon: Package, badge: null },
    { id: 'trueques', label: 'Trueques', icon: RefreshCw, badge: '5' },
    { id: 'finanzas', label: 'Finanzas', icon: DollarSign, badge: null },
    { id: 'analiticas', label: 'Analíticas', icon: BarChart3, badge: null },
    { id: 'configuracion', label: 'Configuración', icon: Settings, badge: null },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  return (
    <aside 
      className={`
        fixed lg:static inset-y-0 left-0 z-50
        flex flex-col
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
      style={{ 
        backgroundColor: settings.sidebarColor,
        width: settings.sidebarWidth
      }}
    >
      {/* Logo Section - MÁS GRANDE */}
      <div className="p-8 flex flex-col items-center border-b border-white/10">
        {/* Logo Container - AUMENTADO */}
        <div 
          className="relative w-28 h-28 rounded-2xl flex items-center justify-center shadow-2xl mb-4 overflow-hidden group cursor-pointer"
          style={{ backgroundColor: settings.primaryColor }}
        >
          {settings.logo ? (
            <img 
              src={settings.logo} 
              alt={settings.appName} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="text-5xl font-black text-white drop-shadow-lg">
              {settings.appName?.slice(0, 2).toUpperCase() || 'SL'}
            </div>
          )}
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Sparkles className="text-white" size={24} />
          </div>
        </div>

        {/* Texto */}
        <h1 className="text-2xl font-bold text-white tracking-tight text-center">
          {settings.appName}
        </h1>
        <p className="text-xs text-white/60 uppercase tracking-[0.2em] mt-2 font-medium">
          {settings.slogan}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`
                w-full flex items-center gap-4 px-4 py-3.5 rounded-xl
                transition-all duration-200 group relative
                ${isActive 
                  ? 'text-white shadow-lg' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
                }
              `}
              style={{
                backgroundColor: isActive ? settings.primaryColor : 'transparent',
                boxShadow: isActive ? `0 4px 20px ${settings.primaryColor}40` : 'none'
              }}
            >
              <Icon size={22} className={isActive ? '' : 'group-hover:scale-110 transition-transform'} />
              
              <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
              
              {item.badge && (
                <span 
                  className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{ 
                    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : settings.primaryColor,
                    color: isActive ? 'white' : 'white'
                  }}
                >
                  {item.badge}
                </span>
              )}
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <button 
          onClick={() => setActiveMenu('soporte')}
          className="w-full flex items-center gap-4 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all text-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="flex-1 text-left">Soporte en línea</span>
        </button>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-sm font-medium"
        >
          <LogOut size={20} />
          <span className="flex-1 text-left">Cerrar Sesión</span>
        </button>
      </div>

      {/* Mobile toggle overlay */}
      {!sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={toggleSidebar}
        />
      )}
    </aside>
  );
};

export default Sidebar;