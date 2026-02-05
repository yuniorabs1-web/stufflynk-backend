import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './Login';
import Dashboard from './Dashboard';

const AppRoutes = () => {
    const { isAuthenticated, loading } = useAuth();

    // Cambié las clases de Tailwind por CSS en línea para que cargue SÍ O SÍ
    if (loading) {
        return (
            <div style={{ 
                height: '100vh', 
                width: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: '#0f172a', // Slate-900
                color: 'white', 
                fontWeight: 'bold' 
            }}>
                Cargando StuffLynk...
            </div>
        );
    }

    return (
        <Routes>
            <Route 
                path="/login" 
                element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />} 
            />
            
            <Route 
                path="/dashboard" 
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} 
            />

            <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

const App = () => (
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
);

export default App;