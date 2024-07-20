import React, { useState, useEffect } from 'react'
import Layout from '../Components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// import { Checkbox, Radio } from "antd"
// import { Price } from '../Components/Layout/Price'

const HomePage = () => {

    const [product, setProducts] = useState([]);
    const [, setProductAvail] = useState(true)

    const navigate = useNavigate();


    //GET PRODUCTS

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

    // For filter 
    // const [categories, setCategories] = useState([]);
    // const [checked, setChecked] = useState([]);
    // const [radio, setRadio] = useState([]);

    // GET CATEGORIES

    // const getAllCategory = async () => {

    //     try {
    //         const { data } = await axios.get('/api/v1/category/get-categories')

    //         if (data.success) {
    //             setCategories(data.categories);
    //         }

    //     } catch (error) {
    //         console.log(error);
    //         toast.error("Failed to load all category")
    //     }
    // }

    // useEffect(() => {
    //     getAllCategory();
    // }, []);



    // const handleFilter = (value, id) => {
    //     let all = [...checked]
    //     if (value) {
    //         all.push(id)
    //     } else {
    //         all = all.filter(c => c !== id)
    //     }
    //     setChecked(all);
    // }


    return (
        <div>
            <Layout title={"All products - Best Offers"}>



                <div className="mt-3 d-flex justify-center align-items-center flex-column">

                    <h1 className="text-center">All products</h1>
                    <div className="d-flex flex-wrap justify-content-center align-items-center">

                        {
                            product.map((p) => (
                                <div className="card m-2" style={{ width: "18rem" }}>
                                    <img src={`/api/v1/product/get-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                        <h5 className="card-title">Price: {p.price}</h5>
                                        <button class="btn btn-primary ms-1" onClick={() => navigate(`product/${p.slug}`)}>More Details</button>
                                        <button class="btn btn-secondary ms-1">Add to cart</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>

            </Layout >
        </div >
    )
}

export default HomePage
