import React from 'react'
import Layout from '../Components/Layout/Layout'
import "../Styles/About.css"

const About = () => {
    return (
        <div>
            <Layout title={"About Us"}>
                <div className="abt-container">
                    <div className="abt-title">
                        <h1>About Us</h1>
                    </div>

                    <div className="abt-text">
                        <h4>Summary</h4>
                        <p>Welcome to ShopEase, your number one source for all things fashion, electronics, home goods, and more. We're dedicated to giving you the very best of online shopping, with a focus on quality, customer service, and uniqueness.</p>

                        <h4>Our Story</h4>
                        <p>Founded in 2020, ShopEase has come a long way from its beginnings as a small online store. When we first started out, our passion for providing top-quality products at unbeatable prices drove us to do intense research and gave us the impetus to turn hard work and inspiration into a booming e-commerce store. We now serve customers all over the world and are thrilled to be a part of the fast-paced, ever-evolving e-commerce industry.</p>
                        <h4>Our Mission</h4>

                        <p>At ShopEase, our mission is to offer an unparalleled shopping experience by delivering exceptional customer service and great merchandise at affordable prices. We work tirelessly to bring you the latest trends and the best deals, ensuring that you can shop with confidence.
                        </p>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default About
