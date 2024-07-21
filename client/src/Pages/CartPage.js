import React from 'react';
import Layout from '../Components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth] = useAuth();


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
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
