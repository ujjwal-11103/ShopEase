import React from 'react'
import Layout from '../../Components/Layout/Layout'
import Adminmenu from '../../Components/Layout/Adminmenu'
const CreateProduct = () => {
    return (
        <div>
            <Layout title={"Admin Create-product"}>
                <div className="container-fluid m-3 p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <Adminmenu />
                        </div>

                        <div className="col-md-9">
                            <h3>Create Product</h3>

                        </div>
                    </div>
                </div>
            </Layout >
        </div>
    )
}

export default CreateProduct
