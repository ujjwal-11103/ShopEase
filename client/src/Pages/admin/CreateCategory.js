import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import CategoryForm from '../../Components/Layout/Form/CategoryForm'
import Adminmenu from '../../Components/Layout/Adminmenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Modal } from 'antd'


const CreateCategory = () => {

    const [categories, setCategories] = useState([])
    const [name, setName] = useState()

    const [visible, setVisible] = useState(false);

    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")

    // CREATE
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/category/create-category', { name })
            if (data?.success) {
                toast.success(`${name} category is created`)
                getAllCategory();
            }
            else {
                toast.error("Something went wrong in creating category")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wroung in inpuut form")
        }

    }
    
    //READ
    const getAllCategory = async () => {

        try {
            const { data } = await axios.get('/api/v1/category/get-categories')
            // const res = await axios.get('/api/v1/category/get-categories')

            // console.log(data.categories);
            // console.log("res");
            // console.log(res);

            if (data.success) {
                setCategories(data.categories);
            }

        } catch (error) {
            console.log(error);
            toast.error("Failed to load all category")
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);


    // UPDATE
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedName })
            if (data.success) {
                toast.success(`${updatedName} updated successfully`)
                setSelected(null)
                setUpdatedName("")
                setVisible(false)
                getAllCategory();
            }
            else {
                toast.error("somethinng ent wrong in updation")
            }
        } catch (error) {
            console.log(error);
            toast.error("Updation error")
        }
    }

    // DELETE
    const handleDelete = async (pid) => {
        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${pid}`)
            console.log(data);

            if (data.success) {
                toast.success(`${data.category.name} deleted successfully`)
                setSelected(null)
                getAllCategory();
            }
            else {
                toast.error("somethinng ent wrong in deletion")
            }
        } catch (error) {
            console.log(error);
            toast.error("Deletion error")
        }
    }
    return (
        <div>
            <Layout title={'Admin Create-Category'}>
                <div className="container-fluid m-3 p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <Adminmenu />
                        </div>

                        <div className="col-md-9">
                            <h3>Manage Category</h3>
                            <div className='p-3 w-50'>
                                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                            </div>
                            <div className='w-75'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Action</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <>
                                            {categories.map((c) => (
                                                <tr key={c._id}>
                                                    <td>{c.name}</td>
                                                    <td><button className='btn btn-primary' onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c) }}>Edit</button></td>
                                                    <td><button className='btn btn-danger' onClick={() => handleDelete(c._id)}>Delete</button></td>
                                                </tr>
                                            ))}
                                        </>

                                    </tbody>
                                </table>
                            </div>
                            <Modal onCancel={() => setVisible(false)} footer={null} visible={visible} ><CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} /></Modal>
                        </div>
                    </div>
                </div>
            </Layout >
        </div>
    )
}

export default CreateCategory
