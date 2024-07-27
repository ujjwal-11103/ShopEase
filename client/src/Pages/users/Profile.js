import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import Usermenu from '../../Components/Layout/Usermenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';

const Profile = () => {
    const [auth, setAuth] = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    // getting stored values
    useEffect(() => {
        if (auth?.user) {
            const { name, email, password, address, phone } = auth.user;
            setName(name);
            setEmail(email);
            // setPassword(password);
            setAddress(address);
            setPhone(phone);
        }
    }, [auth?.user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, password, phone, address);

        try {

            const res = await axios.put('/api/v1/auth/profileUpdate', { name, password, phone, address });

            console.log(res?.data);

            if (res.data.success) {

                console.log(res.data.updatedProfile);

                setAuth({
                    ...auth,
                    user: res.data.updatedProfile,
                });

                // Setting localStoorage
                let ls = localStorage.getItem('auth')
                ls = JSON.parse(ls);
                console.log("ls", ls);
                ls.user = res.data.updatedProfile;
                localStorage.setItem('auth', JSON.stringify(ls))

                toast.success(res.data.message);


            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <div>
            <Layout title={"User-Profile"}>
                <div className="container-fluid m-3 p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <Usermenu />
                        </div>

                        <div className="col-md-7">
                            <h3>Your Profile</h3>
                            <div className="border-light d-flex justify-content-center align-items-center flex-column ">
                                <form className='border rounded p-5 bg-light' onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="form-control"
                                            placeholder="Enter Name"
                                            required
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <input
                                            type="email"
                                            value={email}
                                            disabled
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control"
                                            placeholder="Enter email"
                                            required
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control"
                                            placeholder="Password"
                                            required
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="form-control"
                                            placeholder="Enter phone number"
                                            required
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="form-control"
                                            placeholder="Enter Address"
                                            required
                                        />
                                    </div>

                                    <div className='d-flex justify-content-center '>
                                        <button type="submit" className="btn btn-primary mt-2 text-center">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Profile;
