import React from 'react'
import Layout from '../../Components/Layout/Layout'
import Usermenu from '../../Components/Layout/Usermenu'

const Profile = () => {
    return (
        <div>
            <Layout title={"User-Profile"}>
                <div className="container-fluid m-3 p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <Usermenu />
                        </div>

                        <div className="col-md-9">
                            <h3>Your Profile</h3>
                        </div>
                    </div>
                </div>
            </Layout >
        </div>
    )
}

export default Profile
