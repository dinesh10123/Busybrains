import api from './api';

const login = (username, password) => {
    return api.post('/auth/signin', { username, password });
};

const register = (username, email, password) => {
    return api.post('/auth/signup', { username, email, password });
};

const authService = {
    login,
    register,
};

export default authService;
