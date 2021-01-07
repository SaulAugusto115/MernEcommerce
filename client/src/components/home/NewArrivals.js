import React,{useEffect,useState} from 'react';
import {getProducts} from '../../functions/product'
import ProductCard from '../cards/ProductCard'
import LoadingCard from '../cards/LoadingCard'



const NewArrivals = () =>{

    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)


    useEffect(() => {

        loadAllProducts()

    },[])

    const loadAllProducts =  () => {

        setLoading(true)

        getProducts("createdAt",'desc',4)
        .then((res) => {

           
            console.log(res.data)
            setProducts(res.data)
            setLoading(false)

        }).catch((err) => {
            console.log("Load All Product on Home ERROR",err)
        })
    }

    return(
        <>

        <div className="container">
           { loading ? (<LoadingCard count={4} />) : (<div className="row">
                {products.map((product) => 
                <div className="col-md-4" key={product._id}>
                        <ProductCard product={product} />
                        <br />
                </div>)}
            </div> )}
        </div>

        </>
    );
}

export default NewArrivals;