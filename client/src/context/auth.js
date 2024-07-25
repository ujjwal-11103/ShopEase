import React, { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    // Set default axios header
    useEffect(() => {
        axios.defaults.headers.common["authorization"] = auth?.token;
    }, [auth?.token]);

    // Get auth data from localStorage
    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            });
            console.log("Auth data set from localStorage:", parseData);
        } else {
            console.log("No auth data found in localStorage.");
        }
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
