import React from 'react'
import { useSearch } from '../context/Search'
import Layout from '../Components/Layout/Layout'

const Search = () => {

    const [values,] = useSearch()

    console.log(values);


    return (

        <Layout title={"Search result"}>

            <div className="d-flex flex-wrap justify-content-center align-items-center">
                {
                    values.result.length === 0 ?
                        (
                            <div>
                                <h1>No product found</h1>
                            </div>
                        ) :
                        (
                            values.result.map((p) => (
                                <div className="card m-2">
                                    <img src={`/api/v1/product/get-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                        <h5 className="card-title">Price: {p.price}</h5>
                                        <button class="btn btn-primary ms-1">More Details</button>
                                        <button class="btn btn-secondary ms-1">Add to cart</button>
                                    </div>
                                </div>
                            ))

                        )

                }
            </div>
        </Layout>

    )
}

export default Search
