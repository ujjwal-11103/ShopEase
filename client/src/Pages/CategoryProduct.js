import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
// import useCategory from '../hooks/useCategory'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const CategoryProduct = () => {

    const navigate = useNavigate()
    const params = useParams()
    const slug = params.slug


    const [product, setProduct] = useState([])

    const getcategoryProduct = async () => {


        try {
            const { data } = await axios.get(`/api/v1/product/category-product/${slug}`)

            setProduct(data?.products)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getcategoryProduct()
    }, [params?.slug])
    return (
        <Layout>

            <h3 className="text-center mt-2">Category : {product[0]?.category?.name}</h3>
            <h3 className='text-center'>Total products : {product.length}</h3>  
            <div className="d-flex flex-wrap justify-content-center align-items-center">

                {
                    product?.map((p) => (
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

        </Layout >
    )
}

export default CategoryProduct
