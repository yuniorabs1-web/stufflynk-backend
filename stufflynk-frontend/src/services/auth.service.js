import api from '../api.js';

const authService = {
    login: async (credentials) => {
        // Unificado con la ruta que usa tu backend
        const response = await api.post('/users/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userInfo', JSON.stringify(response.data));
        }
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
    },
    getCurrentUser: () => {
        const user = localStorage.getItem('userInfo');
        return user ? JSON.parse(user) : null;
    },
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

export default authService;