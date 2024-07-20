import React from 'react'
import "../../Styles/Header.css"
import { Link, NavLink } from "react-router-dom"
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import SearchInput from './Form/SearchInput'
import useCategory from '../../hooks/useCategory'


const Header = () => {

    // Auth
    const [auth, setAuth] = useAuth();
    const user = auth.user;
    const handleLogout = () => {
        setAuth({
            ...user,
            user: null,
            token: "",
            role: ""
        })
        toast.success("Logout Success")
        localStorage.removeItem('auth')
    }


    const { category } = useCategory()

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">

                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

                        <div className="logo">
                            <Link to='/' className="navbar-brand"> 🛍️ ShopEase
                            </Link>
                        </div>


                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <SearchInput />

                            <li className="nav-item">
                                <NavLink to='/' className="nav-link" aria-current="page">HOME</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    CATEGORY
                                </Link>

                                <ul className="dropdown-menu">
                                    {category?.map((c) => (
                                        <li><Link to={`/category/${c.slug}`} className="dropdown-item" >{c.name}</Link></li>
                                    ))}
                                </ul>
                            </li>
                            {
                                !user ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink to='/register' className="nav-link">REGISTER</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to='/login' className="nav-link">LOGIN</NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>

                                        <li className="nav-item dropdown">
                                            <NavLink className="nav-link dropdown-toggle" href='#' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {user.name}
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <NavLink to={`/dashboard/${user.role === 1 ? "admin" : "user"}`} className="nav-link">Dashboard</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to='/login' onClick={handleLogout} className="nav-link">LOGOUT</NavLink>
                                                </li>
                                            </ul>
                                        </li>

                                    </>
                                )
                            }
                            <li className="nav-item">
                                <NavLink to='/cart' className="nav-link">CART (0)</NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
