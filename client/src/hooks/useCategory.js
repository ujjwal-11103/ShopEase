import axios from 'axios';
import { useState, useEffect } from 'react'


export default function useCategory() {

    const [category, setCategory] = useState([]);


    // get category
    const getCategory = async () => {

        try {
            const { data } = await axios.get(`/api/v1/category/get-categories`)
            setCategory(data?.categories)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategory()
    }, [])

    return { category }
}

