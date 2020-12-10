import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createCategory,getCategories,removeCategory} from '../../../functions/category'
import {Link} from 'react-router-dom'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'


const CategoryCreate = () =>{

const {user} = useSelector((state) => ({...state}))
const [name,setName] = useState("")
const [loading,setLoading] = useState(false)

//searching filtering Step 1
const [keyword, setKeyword] = useState("")


const [categories,setCategories] = useState([])

useEffect(() =>{

    loadCategories()

},[])


const loadCategories = () => getCategories().then((c) =>

    setCategories(c.data)

).catch((error) =>{
    console.log("ERROR",error)
})

const handleSubmit = (e) =>{
    e.preventDefault()


    //console.log(name)
    setLoading(true)

    createCategory({name}, user.token)
    .then((res) =>{

        setLoading(false)
        setName('')
        toast.success(`"${res.data.name}" is created`)

        loadCategories()
    }).catch((error) =>{
        setLoading(false)
        console.log("ERROR",error)
        if(error.response.status === 400){

            toast.error(error.response.data)
        } 
    })

}

const handleRemove = async (slug) =>{
    //let answer = window.confirm("Delete?")

    //console.log(answer,slug)

    if(window.confirm("Delete?"))
    {
        setLoading(true)
        removeCategory(slug, user.token)
        .then((res) =>{

            setLoading(false)
            //console.log(res.data.name)
            toast.error(`"${res.data.name}" deleted`)
            loadCategories()

        }).catch((error) =>{

            if(error.response.status === 400){
                setLoading(false)
                toast.error(error.response.data)
            } 
        })
    }
}

//STEP 3
/*const handleSearchChange = (e) =>{
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase()) 
} */


//STEP 4
const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);



/*const categoryForm = () => ( <form onSubmit={handleSubmit}>

    <div className="form-group">
        <label>Name</label>
        <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter the category..." autoFocus required />
        <br />
        <button className="btn btn-outline-primary">Save</button>
        
    </div>


</form> ) */




    return (
        <div className="container-fluid">

        <div className="row">
            <div className="col-md-2"><AdminNav /></div>
            <div className="col">
                {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Create Category</h4>)}
                {/*{categoryForm()} */}
                <CategoryForm name={name} setName={setName} handleSubmit={handleSubmit} />

                {/*Step 2*/}
                {/*Step 2 and step 3 has been modifie dto this */}
                <LocalSearch keyword={keyword} setKeyword={setKeyword} />


                <hr />
                {categories.length}



                {/* STEP 5 */}
                {categories.filter(searched(keyword)).map((c) => (<div className="alert alert-secondary" key={c._id}>
                    {c.name}
                    
                    <span className="btn btn-sm float-right" onClick={() => handleRemove(c.slug)}><DeleteOutlined className="text-danger" /></span> 

                    <Link to={`/admin/category/${c.slug}`}>
                        <span className="btn btn-sm float-right">
                            <EditOutlined className="text-warning" />
                        </span>
                        
                    </Link>
                </div>))}
            </div>
        </div>

    </div>
    )
}

export default CategoryCreate