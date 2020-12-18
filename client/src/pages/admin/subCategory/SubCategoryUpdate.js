import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {updateSubCategory,getSubCategory} from '../../../functions/subCategory'
import {getCategories} from '../../../functions/category'
import {useParams} from 'react-router-dom'
import SubCategoryUpdateForm from '../../../components/forms/SubCategoryUpdateForm'

const SubCategoryUpdate = ({history,match}) => {

    const {user} = useSelector((state) => ({...state}))
    const [name,setName] = useState("")
    const [loading,setLoading] = useState(false)
    const [categories,setCategories] = useState([])
    const [parent,setParent] = useState("")
    const [category,setCategory] = useState("")

    let {slug} = useParams()


    useEffect(() => {
        loadCategories()
        loadSubCategory()
    },[])

    const loadCategories = () => getCategories().then((c) => setCategories(c.data))
    const loadSubCategory = () => getSubCategory(match.params.slug).then((c) =>{
        setName(c.data.name)
        setParent(c.data.parent)
    })

    const handleSubmit = (e) => {

        e.preventDefault()

        setLoading(true)

        updateSubCategory(match.params.slug,{name,parent},user.token)
        .then((res) => {

            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" has been updated succesfully`)
            history.push("/admin/subcategory")

        }).catch((err) => {
            console.log("SubCategory Update ERROR",err)
            if(err.response.status === 400) toast.error(`${err.response.data}`)
        })


    }

    return(
        <div className="container-fluid">

            <div className="row">

                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col">
                    
                    {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Update SubCategory</h4>)}
                    <SubCategoryUpdateForm handleSubmit={handleSubmit} name={name} setName={setName} categories={categories} 
                    setParent={setParent} parent={parent} />

                </div>

            </div>

        </div>
    )

}

export default SubCategoryUpdate