import React from 'react'
import "../../Styles/Footer.css"
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="footer">
            <div className='text-light p-3'>
                <h5 className='text-center'>All rights reserved &copy; ujjwal-11103</h5>
            </div>

            <div className="footer-links">
                <Link to='/about'> About</Link> |
                <Link to='/contact'> Contact</Link> |
                <Link to='/policy'> Privacy Policy</Link>
            </div>
        </div>
    )
}

export default Footer
