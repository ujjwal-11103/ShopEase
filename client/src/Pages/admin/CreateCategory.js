import React from 'react'
import Layout from '../../Components/Layout/Layout'
import Adminmenu from '../../Components/Layout/Adminmenu'

const CreateCategory = () => {
    return (
        <div>
            <Layout title={'Admin Create-Category'}>
                <div className="container-fluid m-3 p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <Adminmenu />
                        </div>

                        <div className="col-md-9">
                            {/* <div className="card w-75 p-3" > */}
                            <h3>Category</h3>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </Layout >
        </div>
    )
}

export default CreateCategory
