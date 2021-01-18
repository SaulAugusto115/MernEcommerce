import React,{useEffect,useState} from 'react'
import {getProduct,productStar,productReview} from '../functions/product'
import SingleProduct from '../components/cards/SingleProduct'
import {useSelector} from 'react-redux'

const Product = ({match}) => {

    const {user} = useSelector((state) => ({...state}))

    const [product,setProduct] = useState({})
    const [star,setStar] = useState(0)
    const [review,setReview] = useState("")

    const {slug} = match.params

    useEffect(() => {
        loadSingleProduct()
    },[])

    const loadSingleProduct = () => {
        getProduct(slug).then((res) => {
            setProduct(res.data)
        })
    }

    const onStarClick = (newRating,name) =>{

        setStar(newRating)

        productStar(name,star,user.token)
        .then((res) => {
            console.log('RATING CLICKED',res.data)
            loadSingleProduct() //if you want to show updated rating in real time
        })

        console.table(newRating,name)
        
    }

    const onLeaveReview = (newReview,name) => {
        setReview(newReview)
        //console.table(newReview,name)

        productReview(name,review,user.token)
        .then((res) => {
            console.log("REVIEW WRITTED",res.data)
            loadSingleProduct()
        })
    }

    return(
        <>
            {/*{JSON.stringify(product)}*/}
            <div className="container-fluid">

                <div className="row pt-4">
                    <SingleProduct product={product} onStarClick={onStarClick} onLeaveReview={onLeaveReview} star={star} />
                </div>

                <div className="row p-5">
                    <div className="col text-center pt-5 pb-5">
                        <hr/>
                        <h4>Related Products</h4>
                        <hr/>
                    </div>
                </div>

            </div>
        </>
    )

}

export default Product