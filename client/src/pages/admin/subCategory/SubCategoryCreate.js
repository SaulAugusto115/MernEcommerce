import React,{useState,useEffect,Component } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCategories} from '../../../functions/category'
import {createSubCategory,getSubCategories,removeSubCategory,getSubCategory} from  '../../../functions/subCategory'
import SubCategoryForm from '../../../components/forms/SubCategoryForm'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import LocalSearch from '../../../components/forms/LocalSearch'
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';


const {Item} = Menu


const SubCategoryCreate  = () => {


    const {user} = useSelector((useState) => ({...useState}))

    const [name,setName] = useState('')
    const [loading,setLoading] = useState(false)
    const [subcategories,setSubCategories] = useState([])
    const [categories,setCategories] = useState([])
    const [category,setCategory] = useState("")

    //searching filtering Step 1
    const [keyword,setKeyword] = useState("")

    useEffect(() => {
        loadSubCategories()
        loadCategories()
    },[])

    const loadSubCategories = () => getSubCategories().then((s) =>{
        setSubCategories(s.data)
    }).catch((error) => {
        console.log("Loading Sub Categories ERROR",error)
    })

    const loadCategories = () => getCategories().then((c) =>{
        setCategories(c.data)
    }).catch((err) =>{
        console.log("Load Categories ERROR",err)

    })


    const handleSubmit = (e) =>{
        e.preventDefault()

        setLoading(true)

        createSubCategory({name, parent: category},user.token).then((res) =>{

            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" is created`)

            loadSubCategories()

        }).catch((err) => {

            setLoading(false)

            console.log("Create SubCategory ERROR",err)

            if(err.response.status === 400) toast.error(err.response.data)
        })
    }

    const handleRemove = async (slug) =>{
        if(window.confirm("Delete?")){
            setLoading(true)

            removeSubCategory(slug,user.token)
            .then((res) => {

                setLoading(false)
                toast.error(`"${res.data.name}" deleted`)

                loadSubCategories()

            }).catch((err) =>{
                console.log("Sub Category Remove ERROR",err)
                if(err.response.status === 400) toast.error(err.response.data)
            })

        }
    }

    const menu2 = (
        <Menu>
        
                       
                        {categories.length > 0 && categories.map((c) => { return (
                                <Item key={c._id}  value={c._id}>{c.name}</Item>
                            )
                        })}
                       
            
                    
        </Menu>
      );


      

    const searched = (keyword) => (s) => s.name.toLowerCase().includes(keyword)

    return(
        <div className="container-fluid">

        <div className="row">
            <div className="col-md-2"><AdminNav /></div>
            <div className="col">
                {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Sub Category Create</h4>) }

                {/*<div className="form-group">
                    <label>Category</label>
                    <select name="category" className="form-control" onChange={e => setCategory(e.target.value)}>
                        {categories.length > 0 && categories.map((c) => { return (
                                <option key={c._id} value={c._id}>{c.name}</option>
                            )
                        })}
                    </select>
                </div> */}


                {/*<Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" >
                    <label onChange={e => setCategory(e.target.value)}>Category</label> <DownOutlined />
                    </a>
                </Dropdown>*/}


{/*<select class="mdb-select md-form">
  <option value="" disabled selected>Choose your option</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
            </select> */}

                <select className="browser-default custom-select custom-select-lg mb-3"
                 onChange={e => setCategory(e.target.value)} name="category">
                <option>Select a Category...</option>
                {categories.length > 0 && categories.map((c) => { return (
                        <option key={c._id} value={c._id}>{c.name}</option>
                     )})}
                </select>

            
                <br />

               
                {JSON.stringify(category)}

                
                <SubCategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />


                <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                <hr />
                {subcategories.length}

                {subcategories.filter(searched(keyword)).map((s) => (<div className="alert alert-secondary" key={s._id}> 

                    {s.name}

                    <span className="btn btn-sm float-right" onClick={() => handleRemove(s.slug)}><DeleteOutlined className="text-danger" /></span> 

                    <Link to={`/admin/subcategory/${s.slug}`}>
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

export default SubCategoryCreate