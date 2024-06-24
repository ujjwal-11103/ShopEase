import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Spinner from '../Pages/Spinner';

const Private = () => {

    const [ok, setOk] = useState(false)
    const [auth] = useAuth();


    useEffect(() => {
        const authCheck = async () => {

            try {
                const res = await axios.get('/api/v1/auth/user-auth')
                if (res.data.ok)
                    setOk(true)
                else
                    setOk(false)
            } catch (error) {
                console.log(error);
            }

        }
        if (auth?.token) authCheck();
    }, [auth?.token])


    return ok ? <Outlet /> : <Spinner />
}


export default Private
