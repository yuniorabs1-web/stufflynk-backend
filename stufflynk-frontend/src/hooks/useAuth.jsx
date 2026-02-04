import api from '../api';

/**
 * Hook de autenticación profesional.
 * Gestiona la comunicación con el backend y el almacenamiento de tokens.
 */
export const useAuth = () => {
    const login = async (credentials) => {
        try {
            // Petición optimizada al servidor sincronizado
            const { data } = await api.post('/users/login', credentials);
            
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            return data;
        } catch (error) {
            // Propagamos el error limpio para que el componente lo maneje
            throw error.response?.data?.message || 'Error de conexión con el servidor';
        }
    };

    return { login };
};