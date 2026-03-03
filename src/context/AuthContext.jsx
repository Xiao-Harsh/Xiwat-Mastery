import { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Persist mock login state
    useEffect(() => {
        const savedAuth = localStorage.getItem('xiwat_auth');
        const savedUser = localStorage.getItem('xiwat_user');
        if (savedAuth === 'true' && savedUser) {
            setIsAuthenticated(true);
            const parsedUser = JSON.parse(savedUser);
            // Ensure profileImage is synced from personal storage
            parsedUser.profileImage = localStorage.getItem(`xiwat_profile_${parsedUser.email}`) || null;
            setUser(parsedUser);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/api/login', { email, password });

            const data = response.data;
            const userData = {
                email: data.email,
                name: data.name,
                profileImage: localStorage.getItem(`xiwat_profile_${data.email}`) || null
            };

            setIsAuthenticated(true);
            setUser(userData);
            localStorage.setItem('xiwat_auth', 'true');
            localStorage.setItem('xiwat_user', JSON.stringify(userData));
            return true;
        } catch (error) {
            console.error('Login error:', error);

            if (error.response) {
                if (error.response.status === 403) {
                    throw new Error('INVALID DATA');
                }
                throw new Error(error.response.data?.error || 'Authentication failed');
            }
            throw new Error('Connection error. Please try again later.');
        }
    };

    const register = async (name, email, password) => {
        try {
            await api.post('/api/register', { name, email, password });
            return true;
        } catch (error) {
            console.error('Registration error:', error);

            if (error.response) {
                if (error.response.status === 403) {
                    throw new Error('INVALID DATA');
                }
                throw new Error(error.response.data?.error || 'Registration failed');
            }
            throw new Error('Connection error. Please try again later.');
        }
    };

    const updateProfileImage = (imageUrl) => {
        if (user && user.email) {
            const updatedUser = { ...user, profileImage: imageUrl };
            setUser(updatedUser);
            localStorage.setItem('xiwat_user', JSON.stringify(updatedUser));
            localStorage.setItem(`xiwat_profile_${user.email}`, imageUrl);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('xiwat_auth');
        localStorage.removeItem('xiwat_user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, updateProfileImage }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
