import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {createProduct} from '../../../functions/product'
import ProductForm from '../../../components/forms/ProductForm'
import {toast} from 'react-toastify'
import {getCategories,getCategorySubCategories} from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'

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
    const [categories,setCategories] = useState([])
    const [subOptions,setSubOptions] = useState([])
    const [showSubCategory,setShowSubCategory] = useState(false)

    const {user} = useSelector((state) => ({...state}))

    useEffect(() => {
        loadCategories()
    },[])

    const loadCategories = () => getCategories().then((c) => {

        setValues({...values, categories: c.data})  //c.json({catgeories: c.data})      

    }).catch((err) =>{
        console.log("Load Categgories in Product Component ERROR".err)
    })

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


    const handleCategoryChange = (e) => {
        e.preventDefault()

        console.log("Clicked Category",e.target.value)

        setValues({...values,subcategories: [], category: e.target.value})


        getCategorySubCategories(e.target.value).then(res =>{
            console.log("SUB OPTIONS CATEGORY CLICK",res)
            setSubOptions(res.data)
        });
        
        setShowSubCategory(true)
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
                   {JSON.stringify(values.subcategories)}

                    <div className="p-3">
                        <FileUpload />
                    </div>

                   {/*{JSON.stringify(values.categories)}*/}
                   <ProductForm  handleSubmit={handleSubmit} handleChange={handleChange} setValues={setValues}
                   values={values} handleCategoryChange={handleCategoryChange} subOptions={subOptions} showSubCategory={showSubCategory} />
                </div>

            </div>

        </div>


    )

}

export default ProductCreate