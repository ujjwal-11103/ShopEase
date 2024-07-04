import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';


const Spinner = ({ path = "login" }) => {

    const navigate = useNavigate()
    const [count, setCount] = useState(5)

    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount > 0) {
                    return prevCount - 1;
                } else {
                    // navigate('/login')
                    navigate(`/${path}`, {
                        state: location.pathname,
                    })
                }
            });
        }, 1000);

        // Cleanup function to clear the interval if the component unmounts
        return () => clearInterval(interval);
    }, [count, navigate, location.pathname, path]);

    return (
        <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh" }}>
            <div className="font-weight-normal mb-3 "><h2>Login first</h2></div>
            <div className="font-weight-normal mb-3 "><h2>Redirecting to Login Page in {count}</h2></div>
            <div className="spinner-border" role="status">
            </div>
        </div>
    )
}

export default Spinner
