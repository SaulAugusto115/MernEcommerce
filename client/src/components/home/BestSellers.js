import React,{useEffect,useState} from 'react';
import {getProducts,getProductsCount} from '../../functions/product'
import ProductCard from '../cards/ProductCard'
import LoadingCard from '../cards/LoadingCard'
import {Pagination} from 'antd'

const BestSellers = () =>{

    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(1)
    const [productsCount,setProductsCount] = useState(0)


    useEffect(() => {

        loadAllProducts()

    },[page])

    useEffect(() => {
        loadProductsCount()
    },[])

    const loadAllProducts =  () => {

        setLoading(true)

        getProducts("sold",'desc',page)
        .then((res) => {

           
            console.log(res.data)
            setProducts(res.data)
            setLoading(false)

        }).catch((err) => {
            console.log("Load All Product on Home ERROR",err)
        })
    }

    const loadProductsCount = () => {
        getProductsCount()
        .then((res) => {
            setProductsCount(res.data)
        }).catch((err) => {
            console.log("Load Products Count to Pagination ERROR",err)
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

        <div className="row">
            <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                <Pagination current={page} total={(productsCount / 3) * 10} onChange={value => setPage(value)} />
            </nav>
        </div>

        </>
    );
}

export default BestSellers;