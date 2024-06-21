import React from 'react'
import Layout from '../Components/Layout/Layout'
const Policy = () => {
    return (
        <div>
            <Layout>
                <div class="container mt-5">
                    <h1 className='mb-5'>Privacy Policy :</h1>

                    <h2>Information We Collect</h2>
                    <p>Personal Information: Name, Email address, Shipping and billing address, Phone number, Payment information.</p>
                    <p>Non-Personal Information: IP address, Browser type, Operating system, Referring URLs, Pages viewed, Time spent on our site.</p>

                    <h2>How We Use Your Information</h2>
                    <p>Process and fulfill your orders, Communicate with you, Improve our website, Personalize your experience, Conduct analytics, Prevent fraud.</p>

                    <h2>Sharing Your Information</h2>
                    <p>Service Providers: Trusted third-party service providers who assist us. Legal Requirements: Disclosure when required by law.</p>

                    <h2>Data Security</h2>
                    <p>We implement security measures to protect your data using industry-standard encryption and secure servers.</p>

                    <h2>Cookies</h2>
                    <p>We use cookies to enhance your browsing experience. You can disable cookies in your browser settings.</p>

                    <h2>Third-Party Links</h2>
                    <p>Our website may contain links to third-party sites with their own privacy policies.</p>

                    <h2>Your Rights</h2>
                    <p>You can access, update, delete your personal information, opt-out of marketing, and withdraw consent by contacting us at <a href="mailto:privacy@shopease.com">privacy@shopease.com</a>.</p>

                    <h2>Changes to This Privacy Policy</h2>
                    <p>We may update this policy periodically. Changes will be posted on this page with an updated effective date.</p>

                    <h2>Contact Us</h2>
                    <p>If you have any questions, contact us at:</p>
                    <ul>
                        <li><strong>Email:</strong> <a href="mailto:privacy@shopease.com">privacy@shopease.com</a></li>
                        <li><strong>Address:</strong> 123 ShopEase Avenue, Suite 100, E-commerce City, EC 12345, Mumbai, India</li>
                    </ul>

                    <p>Thank you for trusting ShopEase with your personal information.</p>
                </div>
            </Layout>
        </div>
    )
}

export default Policy
