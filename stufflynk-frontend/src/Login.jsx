import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials);
            window.location.href = '/';
        } catch (error) {
            alert('Error al iniciar sesión. Revisa tu conexión.');
        }
    };

    return (
        <div style={{ backgroundColor: '#000', color: '#00ff00', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace' }}>
            <form onSubmit={handleSubmit} style={{ border: '2px solid #00ff00', padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h2 style={{ textAlign: 'center' }}>STUFFLYNK LOGIN</h2>
                <input 
                    type="email" 
                    placeholder="Usuario / Email" 
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                    style={{ background: '#111', color: '#00ff00', border: '1px solid #00ff00', padding: '10px' }}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    style={{ background: '#111', color: '#00ff00', border: '1px solid #00ff00', padding: '10px' }}
                />
                <button type="submit" style={{ background: '#00ff00', color: '#000', border: 'none', padding: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                    ACCEDER
                </button>
            </form>
        </div>
    );
};

export default Login;
