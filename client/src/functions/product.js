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

export const updateProduct = async (slug,product,authtoken) => await axios.put(`http://localhost:8000/api/product/${slug}`,product,{
    headers:{
        authtoken
    }
})

//export const getProducts = async (sort,order,limit) => await axios.post(`http://localhost:8000/api/products/`,{sort,order,limit})

export const getProducts = async (sort,order,page) => await axios.post(`http://localhost:8000/api/products/`,{sort,order,page})

export const getProductsCount = async () => await axios.get(`http://localhost:8000/api/products/total`)


//rating and review functions
export const productStar = async (productId,star,authtoken) => await axios.put(`http://localhost:8000/api/product/star/${productId}`,{star},{
    headers:{
        authtoken
    }
})

export const productReview = async (productId,review,authtoken) => await axios.put(`http://localhost:8000/api/product/review/${productId}`,{review},{
    headers:{
        authtoken
    }
})