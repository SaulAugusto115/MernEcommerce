import axios from 'axios'

export const getSubCategories = async () => await axios.get('http://localhost:8000/api/subcategories')

export const getSubCategory = async (slug) => await axios.get(`http://localhost:8000/api/subcategory/${slug}`)

export const removeSubCategory = async (slug,authtoken) => await axios.delete(`http://localhost:8000/api/subcategory/${slug}`,{
    headers:{
        authtoken
    }
})

export const updateSubCategory  = async (slug,subcategory,authtoken) => await axios.put(`http://localhost:8000/api/subcategory/${slug}`,subcategory,{
    headers:{
        authtoken
    }
})

export const createSubCategory = async (subcategory, authtoken) => await axios.post(`http://localhost:8000/api/subcategory`,subcategory,{
    headers:{
        authtoken
    }
})