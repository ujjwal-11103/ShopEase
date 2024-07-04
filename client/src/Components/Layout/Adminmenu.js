import React from 'react'
import { NavLink } from 'react-router-dom'

const Adminmenu = () => {
    return (
        <>
            <div className='text-center'>
                <div className="list-group">
                    <h1>Admin Panel</h1>
                    <NavLink to='/dashboard/admin/create-category' className="list-group-item list-group-item-action">Create Category</NavLink>
                    <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
                    <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Products</NavLink>
                    <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
                </div>
            </div>
        </>
    )
}

export default Adminmenu
