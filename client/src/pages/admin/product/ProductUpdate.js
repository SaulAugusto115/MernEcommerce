import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {createProduct, getProduct} from '../../../functions/product'
import ProductForm from '../../../components/forms/ProductForm'
import {toast} from 'react-toastify'
import {getCategories,getCategorySubCategories} from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import {LoadingOutlined} from '@ant-design/icons'
import {useParams} from 'react-router-dom'
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'



const initialState = {
    title:'',
    description:'',
    price:'',
    category:'',
    categories: [],
    subcategory: [],
    shipping: '',
    quantity:'',
    images:[],
    colors:["Black","Brown","Silver","White","Blue"],
    brands: ["Apple","Samsung","Microsoft","Lenovo","Asus"],
    color:'',
    brand:''
}


const ProductUpdate = ({match}) => {

   const [values,setValues] = useState(initialState)

    const {user} = useSelector((state) => ({...state}))

    //router
    //let {slug} = useParams()
    //let params = useParams()
    const {slug} = match.params

    useEffect(() => {
        loadProduct()
    },[])

    const loadProduct = () => {
        getProduct(slug)
        .then((res) => {
            //console.log("Single Product",res)
            setValues({...values,...res.data})
        }).catch((err) => {
            console.log("Get Product ERROR",err)
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        //
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
                    <h4>Product Update</h4>
                    {/*{JSON.stringify(match.params.slug)}*/}
                    {JSON.stringify(values)}
                   <hr />

                   <ProductUpdateForm 

                    handleSubmit={handleSubmit} 
                    handleChange={handleChange}
                    setValues={setValues}
                    values={values}
                   
                   />
                    
                </div>

            </div>

        </div>


    )

}

export default ProductUpdate