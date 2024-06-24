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


const App = () => {
  return (
    <div>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* Private Route */}
        <Route path='/dashboard' element={<Private />}>
          <Route path='' element={<Dashboard />} />
        </Route>


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

