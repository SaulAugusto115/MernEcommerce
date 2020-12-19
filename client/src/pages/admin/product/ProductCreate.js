import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {createProduct} from '../../../functions/product'
import ProductForm from '../../../components/forms/ProductForm'
import {toast} from 'react-toastify'

const initialState = {
    title:'',
    description:'',
    price:'',
    category:'',
    categories: [],
    subcategories: [],
    shipping: '',
    quantity:'',
    images:[],
    colors:["Black","Brown","Silver","White","Blue"],
    brands: ["Apple","Samsung","Microsoft","Lenovo","Asus"],
    color:'',
    brand:''
}



const ProductCreate = () => {

    const [values,setValues] = useState(initialState)

    const {user} = useSelector((state) => ({...state}))


    //destructure
    const {title,description,price,categories, category,subcategories,shipping,quantity,
    images, colors, brands,color,brand} = values



    const handleSubmit = (e) => {
        e.preventDefault()


        createProduct(values,user.token)
        .then((res) => {
            console.log(res)
            window.alert(`"${res.data.title}" is created`)
            window.location.reload()
        }).catch((err) => {
            console.log(err)
            //if(err.response.status === 400) toast.error(err.response.data)
            toast.error(err.response.data.err)
        })

    }

    const handleChange = (e) =>{
        setValues({...values,[e.target.name]: e.target.value})

        //console.log(e.target.name, "------", e.target.value)
    }


    return(
        <div className="container-fluid">

            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                   <h4>Product Create</h4>
                   <hr />
                   {JSON.stringify(values)}
                   <ProductForm title={title} description={description} price={price} shipping={shipping} 
                   quantity={quantity} color={color} colors={colors} handleSubmit={handleSubmit} handleChange={handleChange} brand={brand} 
                   brands={brands} />
                </div>

            </div>

        </div>


    )

}

export default ProductCreate