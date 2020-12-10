import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import {updateCategory,getCategory} from '../../../functions/category'
import {useParams} from 'react-router-dom'


const CategoryCreate = ({history,match}) =>{

    const {user} = useSelector((state) => ({...state}))
    const [name,setName] = useState("")
    const [loading,setLoading] = useState(false)
    const [category,setCategory] = useState([])
    
    let {slug} = useParams()

    useEffect(() =>{
        //console.log(match)
        loadCategories()
        console.log(slug)
    },[])


    const loadCategories = () => getCategory(match.params.slug).then((c) => setName(c.data.name))

    const handleSubmit = (e) =>{
        e.preventDefault()

        //console.log(name)
        setLoading(true)

        updateCategory(match.params.slug,{name},user.token)
        .then((res) =>{

            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" has been updated succesfully`)
            history.push("/admin/category")

        }).catch((error) =>{
            console.log("CATEGORY UPDATE ERROR",error)
            if(error.response.status === 400) toast.error(`${error.response.data}`)
        })





    }





    const updateForm = () => (
        <form onSubmit={handleSubmit}>
            <label>Update Name</label>
            <input type="text" value={name} onChange={c => setName(c.target.value)} className="form-control" placeholder="Enter the new category..." autoFocus required />
            <br />
            <button className="btn btn-primary">Update</button>
        </form>
    )




    return(
       
        <div  className="container-fluid">

            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col">

                {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Upadte Category</h4>)}
                {updateForm()}

                </div>
              
            </div>

        </div>
    )

}

export default CategoryCreate