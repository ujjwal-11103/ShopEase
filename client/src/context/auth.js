import React, { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    })

    // default axios
    axios.defaults.headers.common["authorization"] = auth?.token;


    // data agr pehle se hi rhega toh usko print krwa do
    useEffect(() => {
        const data = localStorage.getItem('auth')

        const parseData = JSON.parse(data)

        if (data) {
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            })
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <AuthContext.Provider value={[auth, setAuth]}>
                {children}
            </AuthContext.Provider>
        </div>
    )

}

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

