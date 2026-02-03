import React from 'react';
import { useAuth } from './hooks/useAuth';

const Dashboard = () => {
    const { user, logout } = useAuth();
    return (
        <div style={{ backgroundColor: '#000', color: '#00ff00', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
            <nav style={{ borderBottom: '1px solid #00ff00', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>STUFFLYNK // USUARIO: {user ? user.email : 'SISTEMA'}</span>
                <button onClick={logout} style={{ background: 'transparent', color: '#ff0000', border: '1px solid #ff0000', cursor: 'pointer', padding: '5px 10px' }}> SALIR </button>
            </nav>
            <main>
                <h1 style={{ color: '#00ff00' }}>SISTEMA PRINCIPAL</h1>
                <div style={{ border: '1px solid #00ff00', padding: '20px', marginTop: '20px', lineHeight: '1.6' }}>
                    <div>ESTADO DEL SERVIDOR: ONLINE</div>
                    <div>BASE DE DATOS: CONECTADA</div>
                    <div>SESION: ACTIVA</div>
                </div>
            </main>
        </div>
    );
};
export default Dashboard;
