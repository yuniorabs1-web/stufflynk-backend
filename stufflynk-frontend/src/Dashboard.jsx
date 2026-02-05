import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Menu,
  Download,
  RefreshCw,
  Calendar,
  Filter,
  MoreHorizontal,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react';
import { useTheme } from './context/ThemeContext';
import { useDashboardData } from './hooks/useDashboardData';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import SettingsPanel from './components/SettingsPanel';

const Dashboard = () => {
  const { settings, sidebarOpen, toggleSidebar } = useTheme();
  const { 
    stats, 
    recentUsers, 
    recentTrades, 
    activityLog, 
    loading, 
    error, 
    lastUpdated,
    refresh 
  } = useDashboardData();
  
  const [activeMenu, setActiveMenu] = useState('resumen');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [dateRange, setDateRange] = useState('7d');

  // Render content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case 'resumen':
        return <ResumenView />;
      case 'usuarios':
        return <UsuariosView />;
      case 'inventario':
        return <InventarioView />;
      case 'trueques':
        return <TruequesView />;
      case 'finanzas':
        return <FinanzasView />;
      case 'analiticas':
        return <AnaliticasView />;
      case 'configuracion':
        return <ConfiguracionView />;
      default:
        return <ResumenView />;
    }
  };

  // VISTA RESUMEN (Dashboard principal)
  function ResumenView() {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Usuarios"
            value={stats.users.total}
            subtitle={`${stats.users.new} nuevos esta semana`}
            change="+12%"
            changeType="positive"
            trend="up"
            icon={Users}
            loading={loading}
          />
          <StatCard 
            title="Productos Activos"
            value={stats.products.available}
            subtitle={`${stats.products.pending} sin stock`}
            change="+5%"
            changeType="positive"
            trend="up"
            icon={Package}
            loading={loading}
          />
          <StatCard 
            title="Trueques Completados"
            value={stats.trades.completed}
            subtitle={`${stats.trades.pending} pendientes`}
            change="+8%"
            changeType="positive"
            trend="up"
            icon={RefreshCw}
            loading={loading}
          />
          <StatCard 
            title="Valor Intercambiado"
            value={`$${stats.trades.value.toLocaleString()}`}
            subtitle={`$${stats.revenue.month.toLocaleString()} este mes`}
            change="+15%"
            changeType="positive"
            trend="up"
            icon={DollarSign}
            loading={loading}
            size="large"
          />
        </div>

        {/* Charts & Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Actividad del Ecosistema</h3>
                <p className="text-sm text-gray-500">Trueques y transacciones en tiempo real</p>
              </div>
              <div className="flex items-center gap-2">
                <select 
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500"
                >
                  <option value="24h">Últimas 24h</option>
                  <option value="7d">Últimos 7 días</option>
                  <option value="30d">Últimos 30 días</option>
                  <option value="90d">Últimos 90 días</option>
                </select>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            {/* Chart Placeholder - Aquí iría Recharts o Chart.js */}
            <div className="h-64 bg-gradient-to-br from-sky-50 to-indigo-50 rounded-xl flex items-center justify-center border border-dashed border-sky-200">
              <div className="text-center">
                <BarChart3 size={48} className="text-sky-300 mx-auto mb-3" />
                <p className="text-sky-600 font-medium">Gráfico de actividad</p>
                <p className="text-sky-400 text-sm">Integrar con Recharts para datos visuales</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Actividad Reciente</h3>
            <div className="space-y-4">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : activityLog.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Sin actividad reciente</p>
              ) : (
                activityLog.slice(0, 6).map((activity, idx) => (
                  <ActivityItem key={idx} activity={activity} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Recent Trades Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Trueques Recientes</h3>
              <p className="text-sm text-gray-500">Últimas transacciones en la plataforma</p>
            </div>
            <button 
              onClick={() => setActiveMenu('trueques')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{ color: settings.primaryColor, backgroundColor: `${settings.primaryColor}10` }}
            >
              Ver todos
              <ArrowUpRight size={16} />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Vendedor</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Valor</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">Cargando...</td>
                  </tr>
                ) : recentTrades.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No hay trueques registrados</td>
                  </tr>
                ) : (
                  recentTrades.map((trade) => (
                    <tr key={trade._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono text-gray-600">#{trade._id?.slice(-6)}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{trade.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{trade.seller?.name || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">${trade.price?.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={trade.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(trade.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Otras vistas (placeholders por ahora)
  function UsuariosView() {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <Users size={48} className="text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-900">Gestión de Usuarios</h3>
        <p className="text-gray-500">Próximamente: Tabla completa con filtros, roles y permisos</p>
      </div>
    );
  }

  function InventarioView() {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <Package size={48} className="text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-900">Inventario</h3>
        <p className="text-gray-500">Próximamente: Gestión de productos y servicios con stock</p>
      </div>
    );
  }

  function TruequesView() {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <RefreshCw size={48} className="text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-900">Centro de Trueques</h3>
        <p className="text-gray-500">Próximamente: Pipeline de negociaciones y disputas</p>
      </div>
    );
  }

  function FinanzasView() {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <DollarSign size={48} className="text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-900">Finanzas</h3>
        <p className="text-gray-500">Próximamente: Reportes de ingresos, comisiones y retiros</p>
      </div>
    );
  }

  function AnaliticasView() {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <BarChart3 size={48} className="text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-900">Analíticas Avanzadas</h3>
        <p className="text-gray-500">Próximamente: Métricas de retención, cohortes y forecasting</p>
      </div>
    );
  }

  function ConfiguracionView() {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Configuración del Sistema</h3>
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="px-6 py-3 rounded-xl text-white font-medium transition-all hover:shadow-lg"
          style={{ backgroundColor: settings.primaryColor }}
        >
          Abrir Panel de Personalización
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            
            {/* Breadcrumb */}
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
              <span>Dashboard</span>
              <span>/</span>
              <span className="font-medium text-gray-900 capitalize">{activeMenu}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex relative w-64 lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar en todo el ecosistema..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 text-sm transition-all"
                style={{ '--tw-ring-color': settings.primaryColor }}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button 
                onClick={refresh}
                className={`p-2 hover:bg-gray-100 rounded-lg transition-all ${loading ? 'animate-spin' : ''}`}
                title="Actualizar datos"
              >
                <RefreshCw size={20} className="text-gray-600" />
              </button>
              
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">Master Admin</p>
                  <p className="text-xs text-gray-500">Administrador</p>
                </div>
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:scale-105 transition-transform"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  MA
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 capitalize">
              {activeMenu}
            </h1>
            <p className="text-gray-500 mt-1">
              {activeMenu === 'resumen' && 'Resumen de tu ecosistema de intercambio'}
              {activeMenu === 'usuarios' && 'Gestión de usuarios y permisos'}
              {activeMenu === 'inventario' && 'Control de productos y servicios'}
              {activeMenu === 'trueques' && 'Centro de transacciones'}
              {activeMenu === 'finanzas' && 'Métricas financieras y reportes'}
              {activeMenu === 'analiticas' && 'Análisis de datos y tendencias'}
              {activeMenu === 'configuracion' && 'Ajustes del sistema'}
            </p>
          </div>

          {/* Content */}
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <XCircle size={48} className="text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-red-800 mb-2">Error de conexión</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={refresh}
                className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Reintentar
              </button>
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </main>

      {/* Settings Panel */}
      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
};

// Componentes auxiliares
const ActivityItem = ({ activity }) => {
  const icons = {
    trade: RefreshCw,
    user: Users,
    product: Package
  };
  
  const colors = {
    trade: 'bg-sky-100 text-sky-600',
    user: 'bg-emerald-100 text-emerald-600',
    product: 'bg-amber-100 text-amber-600'
  };
  
  const Icon = icons[activity.type] || Package;
  
  return (
    <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colors[activity.type]}`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {activity.type === 'trade' && `Nuevo trueque: ${activity.data.title}`}
          {activity.type === 'user' && `Usuario registrado: ${activity.data.name}`}
          {activity.type === 'product' && `Producto añadido: ${activity.data.name}`}
        </p>
        <p className="text-xs text-gray-500">
          {new Date(activity.date).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    draft: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Borrador' },
    active: { bg: 'bg-sky-100', text: 'text-sky-700', label: 'Activo' },
    closed: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Completado' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelado' }
  };
  
  const style = styles[status] || styles.draft;
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
};

// Iconos que faltan en las importaciones
const Users = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const Package = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m7.5 4.27 9 5.15"/>
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
    <path d="m3.3 7 8.7 5 8.7-5"/>
    <path d="M12 22V12"/>
  </svg>
);

const DollarSign = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" x2="12" y1="2" y2="22"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const BarChart3 = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 3v18h18"/>
    <path d="M18 17V9"/>
    <path d="M13 17V5"/>
    <path d="M8 17v-3"/>
  </svg>
);

export default Dashboard;