import React,{useEffect,useState} from 'react';
import {getProductsByCount} from '../functions/product'
import ProductCard from '../components/cards/ProductCard'
import Jumbotron from '../components/cards/Jumbotron'



const Home = () =>{

    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)


    useEffect(() => {

        loadAllProducts()

    },[])

    const loadAllProducts =  () => {

        setLoading(true)

        getProductsByCount(2)
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
        <div className="jumbotron text-danger h1 font-weight-bold text-center">
            <Jumbotron text={['Latest Products','New Arrivals', 'Best Sellers']} />
            {/*{JSON.stringify(products)}*/}
        </div>

        <div className="container">
            <div className="row">
                {products.map((product) => 
                <div className="col-md-4" key={product._id}>
                        <ProductCard product={product} />
                </div>)}
            </div>
        </div>

        </>
    );
}

export default Home;