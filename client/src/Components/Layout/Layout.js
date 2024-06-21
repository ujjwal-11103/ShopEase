import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = (props) => {
    return (
        <div>
            <Header />

            <main style={{ minHeight: "71vh" }}>
                {props.children}
            </main>

            <Footer />
        </div>
    )
}

export default Layout
