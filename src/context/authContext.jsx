import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const savedToken = localStorage.getItem('token');
        return savedToken ? { token: savedToken } : null;
    });

    const login = (token) => {
        localStorage.setItem('token', token);
        setAuth({ token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};