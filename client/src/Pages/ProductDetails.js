import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {

    const params = useParams()

    const [product, setProduct] = useState({});
    const [similarProduct, setSimilarProduct] = useState([]);


    // const slug = params.slug;



    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-single-product/${params.slug}`)
            setProduct(data?.products)
            getSimilarProduct(data?.products?._id, data?.products?.category?._id)

        } catch (error) {
            console.log(error);
        }
    }

    console.log("product")
    console.log(product)

    useEffect(() => {
        if (params?.slug) {
            getProduct();
        }
    }, [params?.slug])



    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
            setSimilarProduct(data?.products)
            console.log("inside function");
            console.log(data);
            console.log(similarProduct?.length);

        } catch (error) {
            console.log(error);
        }
    }


    return (

        <div>
            <Layout>
                {/* <div className="row container mt-2 d-flex justify-content-center align-items-center"> */}
                <div className="d-flex justify-content-around flex-wrap align-items-center">

                    <div className="">

                        <img src={`/api/v1/product/get-photo/${product._id}`} className='mt-2' alt="item.photo" />

                    </div>

                    <div className="col-md-6">
                        <h1 className=''>Product Details</h1>
                        <h5>Name : {product.name}</h5>
                        <h5>Description : {product.description}</h5>
                        <h5>Price : {product.price}</h5>
                        <h5>Category : {product.category?.name}</h5>
                    </div>

                </div>
                {/* </div> */}
                <hr />
                <h3> Similar products</h3>

                {similarProduct?.length < 1 ? (< p > No Products Found</p>) : (
                    <div className="d-flex justify-content-left flex-wrap align-items-center">
                        {similarProduct.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img src={`/api/v1/product/get-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                    <h5 className="card-title">Price: {p.price}</h5>
                                    <button class="btn btn-secondary ms-1">Add to cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}


            </Layout>
        </div >

    )
}
export default ProductDetails
