import axios from 'axios'

//fetch data from the backend

export const createProduct = async (product,authtoken) => await axios.post(`http://localhost:8000/api/product/`,product,{
    headers:{
        authtoken
    }
})

export const getProductsByCount = async (count) => await axios.get(`${process.env.REACT_APP_API}/products/${count}`)

export const removeProduct = async (slug,authtoken) => await axios.delete(`http://localhost:8000/api/product/${slug}`,{
    headers:{
        authtoken
    }
})

export const getProduct = async (slug) => await axios.get(`http://localhost:8000/api/product/${slug}`)