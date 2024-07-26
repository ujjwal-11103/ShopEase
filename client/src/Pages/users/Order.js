import React from 'react'
import Layout from '../../Components/Layout/Layout'
import Usermenu from '../../Components/Layout/Usermenu'

const Order = () => {
    return (
        <div>
            <Layout title={"User-Orders"}>
                <div className="container-fluid m-3 p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <Usermenu />
                        </div>

                        <div className="col-md-9">
                            <h3>All Orders</h3>
                        </div>
                    </div>
                </div>
                
            </Layout >
        </div>
    )
}

export default Order
