import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Rutas actualizadas: Ahora todo está en el mismo nivel (.)
import Login from './Login';
import Loader from './Loader';
import PrivateRoute from './PrivateRoute';

const App = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <Loader />;

    return (
        <Router>
            <Routes>
                <Route 
                    path="/login" 
                    element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} 
                />
                <Route 
                    path="/" 
                    element={
                        <PrivateRoute>
                            <div style={{ padding: '40px', color: 'white', textAlign: 'center' }}>
                                <h1>StuffLynk Dashboard</h1>
                                <p>Bienvenido al panel de control.</p>
                            </div>
                        </PrivateRoute>
                    } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;