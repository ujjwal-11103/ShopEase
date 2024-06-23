import React from 'react'
import Layout from '../Components/Layout/Layout'
import { NavLink } from 'react-router-dom'
import "../Styles/PageNotFound.css"

const PageNotFound = () => {
    return (
        <div>
            <Layout title={"404 - Not found"}>
                <div className="pnf-container">
                    <div className="pnf-status">
                        <h1>Error : 404</h1>
                    </div>
                    <div className="pnf-text">
                        <h3>Content Not Found</h3>
                    </div>
                    <div className="pnf-Navlink">
                        <NavLink to='/' >Go Back</NavLink>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default PageNotFound
