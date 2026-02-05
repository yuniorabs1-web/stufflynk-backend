import { useState, useEffect, useCallback } from 'react';
import api from '../api';

export const useDashboardData = () => {
  const [data, setData] = useState({
    stats: {
      users: { total: 0, new: 0, active: 0 },
      products: { total: 0, available: 0, pending: 0 },
      services: { total: 0, available: 0 },
      trades: { total: 0, completed: 0, pending: 0, value: 0 },
      revenue: { total: 0, commission: 0, month: 0 }
    },
    recentUsers: [],
    recentTrades: [],
    topProducts: [],
    activityLog: [],
    loading: true,
    error: null,
    lastUpdated: null
  });

  const [filters, setFilters] = useState({
    dateRange: '7d', // 24h, 7d, 30d, 90d, 1y, all
    status: 'all'
  });

  const fetchData = useCallback(async (silent = false) => {
    if (!silent) setData(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const [usersRes, productsRes, servicesRes, tradesRes] = await Promise.all([
        api.get('/users'),
        api.get('/products'),
        api.get('/services'),
        api.get('/deals')
      ]);

      const users = usersRes.data || [];
      const products = productsRes.data || [];
      const services = servicesRes.data || [];
      const trades = tradesRes.data || [];

      const now = new Date();
      const last7Days = new Date(now - 7 * 24 * 60 * 60 * 1000);
      const last24h = new Date(now - 24 * 60 * 60 * 1000);

      // Calcular métricas avanzadas
      const newUsers = users.filter(u => new Date(u.createdAt) > last7Days).length;
      const activeUsers = users.filter(u => {
        const lastLogin = new Date(u.lastLogin || u.createdAt);
        return lastLogin > last7Days;
      }).length;

      const completedTrades = trades.filter(t => t.status === 'closed');
      const pendingTrades = trades.filter(t => t.status === 'active' || t.status === 'draft');
      const totalValue = completedTrades.reduce((sum, t) => sum + (t.price || 0), 0);
      const monthlyValue = completedTrades
        .filter(t => new Date(t.updatedAt) > last7Days)
        .reduce((sum, t) => sum + (t.price || 0), 0);

      // Actividad reciente (últimos 10 eventos)
      const activityLog = [
        ...trades.map(t => ({ type: 'trade', data: t, date: t.createdAt })),
        ...users.map(u => ({ type: 'user', data: u, date: u.createdAt })),
        ...products.map(p => ({ type: 'product', data: p, date: p.createdAt }))
      ]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);

      setData({
        stats: {
          users: { total: users.length, new: newUsers, active: activeUsers },
          products: { 
            total: products.length, 
            available: products.filter(p => p.stock > 0).length,
            pending: products.filter(p => p.stock === 0).length
          },
          services: { 
            total: services.length, 
            available: services.length 
          },
          trades: { 
            total: trades.length, 
            completed: completedTrades.length, 
            pending: pendingTrades.length,
            value: totalValue 
          },
          revenue: { 
            total: totalValue * 0.05, // 5% comisión estimada
            commission: 0.05,
            month: monthlyValue * 0.05
          }
        },
        recentUsers: users.slice(0, 5),
        recentTrades: trades.slice(0, 5),
        topProducts: products
          .sort((a, b) => (b.views || 0) - (a.views || 0))
          .slice(0, 5),
        activityLog,
        loading: false,
        error: null,
        lastUpdated: new Date()
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setData(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || 'Error de conexión'
      }));
    }
  }, [filters]);

  // Auto-refresh cada 30 segundos
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(true), 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const refresh = () => fetchData(false);

  return { ...data, filters, setFilters, refresh };
};