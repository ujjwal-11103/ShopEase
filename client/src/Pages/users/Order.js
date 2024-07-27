import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import Usermenu from '../../Components/Layout/Usermenu'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import moment from "moment"
import { IoMdRefresh } from "react-icons/io";
import toast from 'react-hot-toast'


const Order = () => {

    const [auth, setAuth] = useAuth();
    const [order, setOrder] = useState([])

    const getOrders = async () => {

        const { data } = await axios.get("/api/v1/auth/orders")
        console.log(data);

        setOrder(data.orders)
    }

    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])

    const handleRefresh = async () => {
        const { data } = await axios.get("/api/v1/auth/orders")
        setOrder(data.orders)
        toast.success("Refreshed")
    }

    return (
        <div>
            <Layout title={"User-Orders"}>
                <div className="container-fluid m-3 p-3">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-3">
                            <Usermenu />
                        </div>

                        <div className="col-md-12 ">

                            <div className="d-flex justify-content-between align-items-center my-2">
                                <h2>All Orders</h2>
                                <h3><IoMdRefresh style={{ marginRight: '30px', cursor: "pointer" }} onClick={handleRefresh} /></h3>
                            </div>

                            {/* <button onClick={handleRefresh}>refresh</button> */}
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope='col'>No</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Buyer</th>
                                        <th scope='col'>Date</th>
                                        <th scope='col'>Payment</th>
                                        <th scope='col'>Quantity</th>
                                        <th scope='col'>Product Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        order?.map((item, index) =>
                                        (

                                            <tr>
                                                <td scope='row'>{index + 1}</td>
                                                <td>{item.status}</td>
                                                <td>{item.buyer.name}</td>
                                                <td>{moment(item.createdAt).fromNow()}</td>
                                                <td>{item.payment.success ? "Success" : "Failed"}</td>
                                                <td>{item.products.length}</td>
                                                {
                                                    item?.products?.map((p) => (

                                                        <div key={p._id} className="row mb-1 border flex-row">
                                                            <div className="col-md-4">
                                                                <img src={`/api/v1/product/get-photo/${p._id}`} className="card-img-top" alt={p.name} width={"100px"} height={"150px"} />
                                                            </div>
                                                            <div className="col-md-6 bg-light">
                                                                <p className="card-title">{p.name}</p>
                                                                <p className="card-text">{p.description}</p>
                                                                <p className="card-title">Price: {p.price}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </tr>
                                            // <h1>{ order[0]?.products?.length }</h1>

                                        )
                                        )

                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>

                </div>

            </Layout >
        </div>
    )
}

export default Order
