import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {createProduct, getProduct,updateProduct} from '../../../functions/product'
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
    //categories: [],
    subcategory: [],
    shipping: '',
    quantity:'',
    images:[],
    colors:["Black","Brown","Silver","White","Blue"],
    brands: ["Apple","Samsung","Microsoft","Lenovo","Asus"],
    color:'',
    brand:''
}


const ProductUpdate = ({match,history}) => {

   const [values,setValues] = useState(initialState)
   const [categories,setCategories] = useState([])
   const [subOptions,setSubOptions] = useState([])
   const [showSubCategory,setShowSubCategory] = useState(false)
   const [arrayOfSubs,setArrayOfSubIds] = useState([])
   const [selectedCategory,setSelectedCategory] = useState("")
   const [loading,setLoading] = useState(false)

    const {user} = useSelector((state) => ({...state}))

    //router
    //let {slug} = useParams()
    //let params = useParams()
    const {slug} = match.params

    useEffect(() => {
        loadProduct()
        loadCategories()
    },[])

    const loadProduct = () => {
        getProduct(slug)
        .then((res) => {
            //console.log("Single Product",res)
            //1 load single product
            setValues({...values,...res.data})

            //2 load single product category subcategory
            getCategorySubCategories(res.data.category._id)
            .then((res) => {
                setSubOptions(res.data) //on first load, show default subs

            })

            //3 prepare array of subcategory ids to show as defaults subcatgeory values in antd design select
            let arr = []
            res.data.subcategory.map((s) => {
                arr.push(s._id)
            })

            console.log("ARR",arr)
            setArrayOfSubIds((previousValues) => arr) //require for ant design select to work

        }).catch((err) => {
            console.log("Get Product ERROR",err)
        })
    }

    const loadCategories = () => getCategories().then((c) => {

        console.log("GET CATEGORIES ON UPDATE PRODUCT",c.data)
        //setValues({...values,categories: c.data})
        setCategories(c.data)

    }).catch((err) => {
        console.log("Load Categories ERROR",err)
    })


    const handleCategoryChange = (e) => {
        e.preventDefault()

        console.log("CLICKED CATEGORY",e.target.value)

        setValues({...values,subcategory: []})

        setSelectedCategory(e.target.value)

        getCategorySubCategories(e.target.value).then((res) => {
            setSubOptions(res.data)
        })

        console.log("EXISTING CATEGORIES values.category",values.category)

        //setShowSubCategory(true)

        //if user clicks to the original category
        //show its siubcategories in default
        if(values.category._id === e.target.value)
        {
            loadProduct()
        }


        //clear old category ids
        setArrayOfSubIds([])
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        //

        setLoading(true)

        values.subcategory = arrayOfSubs
        values.category = selectedCategory ? selectedCategory : values.category

        updateProduct(slug,values,user.token)
        .then((res) => {

            setLoading(false)
            toast.success(`"${res.data.title}" is updated succesfully`)
            history.push("/admin/products/")

        }).catch((err) => {
            console.log(err)
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
                {loading ? (<LoadingOutlined className="text-danger h1" />) : (<h4>Product Update</h4>)}
                    {/*{JSON.stringify(match.params.slug)}*/}
                    {JSON.stringify(values)}
                    <div className="p-3">
                    <FileUpload
                        values={values}
                        setValues={setValues}
                        setLoading={setLoading}
                     />
                    </div>
                   <hr />

                   <ProductUpdateForm 

                    handleSubmit={handleSubmit} 
                    handleChange={handleChange}
                    setValues={setValues}
                    values={values}
                    handleCategoryChange={handleCategoryChange}
                    categories={categories}
                    subOptions={subOptions}
                    arrayOfSubs={arrayOfSubs}
                    setArrayOfSubIds={setArrayOfSubIds}
                    selectedCategory={selectedCategory}
                   
                   />
                    
                </div>

            </div>

        </div>


    )

}

export default ProductUpdate