import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../Components/Layout/Layout'
import Adminmenu from '../../Components/Layout/Adminmenu'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Select } from 'antd'
const { Option } = Select


const UpdateProduct = () => {
    const navigate = useNavigate()
    const params = useParams()

    const [categories, setCategories] = useState([])

    const [category, setCategory] = useState("")
    const [photo, setPhoto] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [id, setId] = useState("")
    // const [catName, setCatname] = useState("")



    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-single-product/${params.slug}`)

            // console.log(data);

            setName(data.products.name)
            setDescription(data.products.description)
            setPrice(data.products.price)
            setQuantity(data.products.quantity)
            setCategory(data.products.category._id)
            setId(data.products._id)
            // setCatname(data.products.category.name)

        } catch (error) {
            console.log(error)
            toast.error("Error inn fetching single product")
        }
    }
    useEffect(() => {
        getSingleProduct();
        // eslint-disable-next-line 
    }, [])


    // getting all categories in the search
    const getAllCategory = async () => {

        try {

            const { data } = await axios.get('/api/v1/category/get-categories')

            if (data?.success) {
                setCategories(data?.categories);
            }
            // console.log(categories);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load all category in prooduct")
        }
    }


    useEffect(() => {
        getAllCategory();
    }, []);

    // handle update
    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            const productData = new FormData()

            productData.append('name', name)
            productData.append('description', description)
            productData.append('price', price)
            productData.append('category', category)
            productData.append('quantity', quantity)
            photo && productData.append('photo', photo)

            const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData)
            console.log("In Update");
            console.log(data);

            if (data.success) {
                toast.success('Product added successfully')
                navigate("/dashboard/admin/products")
            }
            else {
                toast.error("error in updation")
            }

        } catch (error) {
            console.log(error);
            toast.error('Error in product updation')
        }
    }

    // handle delete
    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`)

            if (data.success) {
                toast.success("Product deleted successfully");
                navigate("/dashboard/admin/products")
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete")
        }
    }
    return (
        <div>
            <Layout title={"Admin Create-product"}>
                <div className="container-fluid m-3 p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <Adminmenu />
                        </div>

                        <div className="col-md-9">
                            <h3>Update Product</h3>

                            {/* search functionlity */}
                            <div className="m-1 w-75">

                                <Select bordered={false}
                                    placeholder="Select a category"
                                    size='large'
                                    showSearch className='form-select mb-3'
                                    onChange={(value) => { setCategory(value) }} value={category}>

                                    {categories.map((c) => (
                                        <Option key={c._id} value={c._id}>{c.name}</Option>
                                    ))}

                                </Select>

                                {/* Upload Button */}

                                <div className="mb-3">

                                    <label className='btn btn-outline-secondary col-md-12'>
                                        {photo ? photo.name : "Upload Photo"}
                                        <input type="file" name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                    </label>
                                </div>
                                {/* Photo Section */}

                                <div className="mb-3">
                                    {photo ? (
                                        <div className="text-center">
                                            <img src={URL.createObjectURL(photo)} alt="product-photo" height={'200px'} className='img img-responsive' />
                                        </div>
                                    ) :
                                        (
                                            <div className="text-center">
                                                <img src={`/api/v1/product/get-photo/${id}`} alt="product-photo" height={'200px'} className='img img-responsive' />
                                            </div>
                                        )}
                                </div>

                                {/* Input section */}

                                <div className="mb-3">
                                    <input type="text" value={name} placeholder='Enter name of the product' className='form-control' onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <textarea type="text" value={description} placeholder='Enter Description of the product' className='form-control' onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="number" value={price} placeholder='Enter price of the product' className='form-control' onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="number" value={quantity} placeholder='Enter quantity of the product' className='form-control' onChange={(e) => setQuantity(e.target.value)} />
                                </div>

                                <Select bordered={false}
                                    placeholder="Select Shipping"
                                    size='large'
                                    showSearch className='form-select mb-3'
                                    onChange={(value) => { setShipping(value) }} value={shipping ? "yes" : "No"}>
                                    <Option value='1'>Yes</Option>
                                    <Option value='0'>No</Option>
                                </Select>

                            </div>
                            <div className="mb-3">
                                <button className='btn btn-primary' onClick={handleUpdate}>Update product</button>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-danger' onClick={handleDelete}>Delete product</button>
                            </div>
                        </div>

                    </div>
                </div>
            </Layout >
        </div>
    )
}

export default UpdateProduct
