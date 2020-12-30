import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {getProductsByCount } from '../../../functions/product'
import AdminProductCard from '../../../components/cards/AdminProductCard'
import {removeProduct} from '../../../functions/product'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'

const AllProducts = () =>{

    const {user} = useSelector((state) => ({...state}) )
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(() => {
       
        loadAllProducts()

    },[])

    const loadAllProducts = () => {
        
        setLoading(true)

        getProductsByCount(100)
        .then((res) => {
            //console.log(res.data)
            setProducts(res.data)

            setLoading(false)
        })
        .catch((err) => {
            console.log("Get Products By Count ERROR",err)

            setLoading(false)
        })
    }

    const handleRemove = (slug) => {

        let answer = window.confirm('Delete?')

        if(answer)
        {
            //console.log('send delete request',slug)
            removeProduct(slug,user.token)
            .then((res) => {

                loadAllProducts()
                toast.success(`"${res.data.title}" deleted succesfully`)

            }).catch((err) => {
                console.log("Delete product ERROR",err)
                //toast.error(`"${err.data.title}" delete failed`)
                if(err.response.status === 400){
                    toast.error(err.response.data)
                } 
            })
        }

    }

    return (
        <div className="container-fluid">

        <div className="row">
            <div className="col-md-2"><AdminNav /></div>

            

            {/*<div className="col">{JSON.stringify(products)}</div>*/}
            <div className="col">

            {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>All Products</h4>)}
            
            <div className="row">
                {products.map(product => (

                <div className="col-md-4 pb-3" key={product._id}> 
    
                    <AdminProductCard product={product} handleRemove={handleRemove}  />

                </div>


                ))}
            </div>

                
            </div>


        </div>

    </div>
    )
}

export default AllProducts