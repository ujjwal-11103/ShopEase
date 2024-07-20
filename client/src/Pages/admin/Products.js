import React, { useEffect, useState } from 'react'
import Adminmenu from '../../Components/Layout/Adminmenu'
import Layout from '../../Components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Products = () => {
    const [product, setProducts] = useState([]);

    const [productAvail, setProductAvail] = useState(true)

    const getAllProducts = async () => {

        try {
            const { data } = await axios.get("/api/v1/product/get-product");

            if (data.countTota === 0) {
                toast.error("No products there")
                setProductAvail(false)
            }

            if (data.success) {
                setProducts(data.products)
                // toast.success("Products Fetched")
            }


        } catch (error) {
            console.log(error);
            toast.error("Error in getting products");
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <div>
            <Layout>

                <div className="row">

                    <div className="col-md-3">

                        <Adminmenu />

                    </div>

                    <div className="col-md-9">

                        <h1 className='text-center'>All Products List</h1>
                        <div className="d-flex flex-wrap">

                            {productAvail ? (
                                product.map((p) => (
                                    <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} style={{ textDecoration: "none", color: "black" }}>
                                        <div className="card m-2">
                                            <img src={`/api/v1/product/get-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                            <div className="card-body">
                                                <h5 className="card-title">{p.name}</h5>
                                                <p className="card-text">{p.description}</p>
                                                <h5 className="card-title">₹{p.price}</h5>
                                            </div>
                                        </div>

                                    </Link>
                                ))
                            ) : (
                                <div className='d-flex justify-content-center align-center flex-column'>
                                    <h3>No products to display</h3>
                                    <h3>Create products first</h3>
                                </div>
                            )
                            }
                        </div>

                    </div>

                </div>

            </Layout >
        </div>
    )
}

export default Products
