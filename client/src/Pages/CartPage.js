import React, { useEffect } from 'react';
import Layout from '../Components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth] = useAuth();

    const handleRemove = (pid) => {
        console.log(pid);
        setCart((prevcart) => prevcart.filter((p) => p._id !== pid));
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify([...cart]))
    }, [cart])

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
                    <div className="col-md-3">
                        Checkout || Payment
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
