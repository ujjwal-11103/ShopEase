import React, { useState } from 'react'
import Layout from '../Components/Layout/Layout'
import axios from "axios"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, password, phone, address);

        // toast.success("Registed successfully")
        // console.log(process.env.REACT_API_KEY);
        try {
            // POST 
            const res = await axios.post('/api/v1/auth/register', { name, email, password, phone, address });

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/login");
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
            <Layout title={"Register"}>

                <div className="border-light d-flex justify-content-center align-items-center flex-column ">
                    <h1 className='mb-3'>Register</h1>
                    <form className='border rounded p-5 bg-light' onSubmit={handleSubmit} >
                        <div className="form-group mb-3">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" required />
                        </div>

                        <div className="form-group mb-3">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
                        </div>

                        <div className="form-group mb-3">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" required />
                        </div>


                        <div className="form-group mb-3">
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter phone phone" required />
                        </div>

                        <div className="form-group mb-3">
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Address" required />
                        </div>

                        <div className='d-flex justify-content-center '>
                            <button type="submit" className="btn btn-primary mt-2 text-center">Regsiter</button>
                        </div>
                    </form>
                </div>
            </Layout>
        </div>
    )
}

export default Register
