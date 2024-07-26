import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import toast from 'react-hot-toast';



const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth] = useAuth();

    const navigate = useNavigate()

    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState();
    const [loading, setLoading] = useState(false);


    // REMOVE PRODUCT FROM CART
    // const handleRemove = async (pid) => {
    //     console.log(pid);
    //     await setCart((prevcart) => prevcart.filter((p) => p._id !== pid));
    //     localStorage.setItem('cart', JSON.stringify([...cart]))
    // };


    // REMOVE PRODUCT FROM CART
    const handleRemove = (pid) => {
        let myCart = [...cart]
        let index = myCart.findIndex((item) => item._id === pid)
        myCart.splice(index, 1)
        setCart(myCart);
        localStorage.setItem('cart', JSON.stringify(myCart))
    }

    // TOTAL PRICE
    const price = () => {
        try {
            let totalPrice = 0;
            cart?.map((item) => {
                totalPrice = totalPrice + item.price;
            });
            return totalPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "INR"
            })
        } catch (error) {
            console.log(error);
            return '$0.00'
        }
    }

    // Get payment token
    const getToken = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/braintree/token")
            console.log("In get Token");
            setClientToken(data?.message?.clientToken)
            // console.log(data?.message?.clientToken);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getToken()
    }, [auth?.token])

    // useEffect(() => {
    //     console.log("Clent toekn data");
    //     console.log(clientToken);
    // }, [clientToken])

    // handle payment
    const handlePayment = async () => {
        try {
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post("/api/v1/product/braintree/payment", {
                nonce, cart
            })
            console.log(data);
            setLoading(false)
            localStorage.removeItem("cart")
            setCart([])
            toast.success("Payment Successfull")
            navigate("/dashboard/user/orders")
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    };
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-left bg-light p-2 mb-1">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h2>
                        <h4 className='text-center'>
                            {cart?.length ? `You have ${cart.length} items in cart ${auth?.token ? "" : "Please login to checkout"}` : `Your cart is empty`}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {cart?.map((p) => (
                            <div key={p._id} className="row mb-2 p-3 card flex-row">
                                <div className="col-md-4">
                                    <img src={`/api/v1/product/get-photo/${p._id}`} className="card-img-top" alt={p.name} width={"100px"} height={"150px"} />
                                </div>
                                <div className="col-md-8">
                                    <p className="card-title">{p.name}</p>
                                    <p className="card-text">{p.description}</p>
                                    <p className="card-title">Price: {p.price}</p>
                                    <button className='btn btn-danger' onClick={() => handleRemove(p._id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4 text-center">
                        <h2 className='text-center'>Cart Summary</h2>
                        <p className='text-center'>Total | Checkout | Payment</p>
                        <hr />
                        <h3>Total : {price()}</h3>
                        {
                            auth?.user?.address ?
                                (
                                    <div className='d-flex justify-content-center align-items-cener flex-column'>
                                        <h5>Address : {auth?.user?.address}</h5>
                                        <div className="d-flex gap-3 justify-content-center align-items-cener">

                                            <button className='btn btn-outline-warning text-black' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                        </div>
                                    </div>
                                )
                                :
                                (
                                    <>
                                        {auth?.token ?
                                            (<><button className='btn btn-outline-warning text-black' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                            </>)
                                            :
                                            (<><button className='btn btn-outline-warning text-black' onClick={() => navigate('/login', { state: "/cart" })}>Please Login to checkout</button>
                                            </>)}
                                    </>
                                )
                        }
                        {(clientToken && cart?.length > 0) && (

                            <div className="mt-2">

                                <DropIn
                                    options={{
                                        authorization: clientToken,
                                        paypal: {
                                            flow: "vault"
                                        }
                                    }}
                                    onInstance={(instance) => setInstance(instance)}
                                />
                                <button className='btn btn-success' onClick={handlePayment} disabled={loading || !instance || !auth?.user?.address}>{loading ? "Processing" : "Make Payment"}</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
