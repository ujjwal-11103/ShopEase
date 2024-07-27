import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import Adminmenu from '../../Components/Layout/Adminmenu'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import moment from "moment"
import { Select } from 'antd'
import { Option } from 'antd/es/mentions'



const AdminOrders = () => {

    const [status, setStatus] = useState(["Not Process", "Processing", "Shipping", "Shipped", "Delivered", "Cancel"])
    const [changeStatus, setChangeStatus] = useState("")

    const handleChange = async (orderId, value) => {
        const { data } = await axios.put(`/api/v1/auth/orders-status/${orderId}`, { status: value })
        console.log(data);
        setChangeStatus(data?.status)
    }



    const [auth, setAuth] = useAuth();
    const [order, setOrder] = useState([])

    const getOrders = async () => {

        const { data } = await axios.get("/api/v1/auth/all-orders")
        console.log(data);

        setOrder(data.orders)
    }

    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])
    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <Adminmenu />
                    </div>
                    <div className="col-md-9">
                        <h3>All Orders</h3>

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

                                            <td>
                                                <Select defaultValue={item?.status} onChange={(value) => { handleChange(item._id, value) }}>
                                                    {status.map((s, i) => (
                                                        <Option key={i} value={s}>
                                                            {s}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </td>
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
            </div >
        </Layout>
    )
}

export default AdminOrders
