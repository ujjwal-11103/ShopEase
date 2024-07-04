import React from 'react'
import { Routes, Route } from "react-router-dom"
import HomePage from './Pages/HomePage'
import About from './Pages/About'
import Policy from './Pages/Policy'
import Contact from './Pages/Contact'
import PageNotFound from './Pages/PageNotFound'
import Register from './Pages/Register'
import Login from "./Pages/Login"
import Dashboard from './Pages/users/Dashboard'
import { Toaster } from 'react-hot-toast';
import Private from './Routes/Private'
import AdminDashboard from './Pages/admin/AdminDashboard'
import AdminPrivate from './Routes/AdminPrivate'
import CreateCategory from './Pages/admin/CreateCategory'
import AllUsers from './Pages/admin/AllUsers'
import CreateProduct from './Pages/admin/CreateProduct'
import Profile from './Pages/users/Profile'
import Order from './Pages/users/Order'
import Products from './Pages/admin/Products'
import UpdateProduct from './Pages/admin/UpdateProduct'


const App = () => {
  return (
    <div>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* Private Route for user*/}
        <Route path='/dashboard' element={<Private />}>
          <Route path='user' element={<Dashboard />} />
        </Route>
        <Route path='/dashboard/user/profile' element={<Profile />} />
        <Route path='/dashboard/user/orders' element={<Order />} />


        {/* Private Route for admin*/}
        <Route path='/dashboard' element={<AdminPrivate />}>
          <Route path='admin' element={<AdminDashboard />} />
        </Route>
        <Route path='/dashboard/admin/create-category' element={<CreateCategory />} />
        <Route path='/dashboard/admin/create-product' element={<CreateProduct />} />
        <Route path='/dashboard/admin/products' element={<Products />} />
        <Route path='/dashboard/admin/product/:slug' element={<UpdateProduct />} />
        <Route path='/dashboard/admin/users' element={<AllUsers />} />


        <Route path='/about' element={<About />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='contact' element={<Contact />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App

