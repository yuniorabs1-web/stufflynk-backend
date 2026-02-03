import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
        <h2>StuffLynk Dashboard</h2>
        <button 
          onClick={handleLogout}
          style={{ padding: '8px 16px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Cerrar Sesión
        </button>
      </header>

      <main style={{ marginTop: '30px' }}>
        <div style={{ backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <p>Sesión iniciada como: <strong>{user?.email || 'Usuario Autenticado'}</strong></p>
          <p>Servidor: <span style={{ color: '#2e7d32' }}>● localhost:10000 (Activo)</span></p>
        </div>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <h3>Estadísticas</h3>
            <p>Datos sincronizados con MongoDB.</p>
          </div>
          <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <h3>Actividad Reciente</h3>
            <p>No hay eventos pendientes.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;