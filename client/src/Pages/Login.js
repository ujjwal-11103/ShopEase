import React, { useState } from 'react'
import Layout from '../Components/Layout/Layout';
import axios from "axios"
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../context/auth';

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // context API
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate()
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);

        try {
            // POST 
            const res = await axios.post('/api/v1/auth/login', { email, password });
            console.log(res);

            if (res.data.success) {
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                    role: res.data.role
                })

                // localStorage
                localStorage.setItem("auth", JSON.stringify(res.data))
                navigate(location.state || "/");
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wronng")
        }

    }
    return (
        <div>
            <Layout title={"Login"}>

                <div class="border-light d-flex justify-content-center align-items-center flex-column ">
                    <h1 class='mb-3'>Login</h1>
                    <form className='border p-5' onSubmit={handleSubmit} >


                        <div class="form-group mb-3">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>

                        <div class="form-group mb-3">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>

                        <div className='d-flex justify-content-center '>
                            <button type="submit" class="btn btn-primary mt-3 text-center">Login</button>
                        </div>
                    </form>
                </div>
            </Layout>
        </div>
    )

}
export default Login
