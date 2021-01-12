import React from 'react'
import {Card, Tabs} from 'antd'
import {Link} from 'react-router-dom'
import {HeartOutlined,ShoppingCartOutlined} from '@ant-design/icons'
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Laptop from '../../images/laptop.png'
import ProductListItems from './ProductListItems'
import SliderImage from 'react-zoom-slider'

const {Meta} = Card;

const {TabPane} = Tabs;

const SingleProduct = ({product}) => {

    const {title,images,description} = product;

    const data = [
        {
          image: images.url,
          text: 'img1'
        },
        {
          image: 'https://cdn.tgdd.vn/Products/Images/42/209800/oppo-reno2-f-xanh-4-org.jpg',
          text: 'img2'
        },
        {
          image: 'https://cdn.tgdd.vn/Products/Images/42/209800/oppo-reno2-f-xanh-10-org.jpg',
          text: 'img3'
        },
      ];

    return(
        <>
      
        
            <div className="col-md-7">
                { images && images.length ?  <Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
                    
                </Carousel> : 

                    <Card cover={<img src={Laptop}  className='mb-3 card-image' />}>
                    </Card>
                }

            <Tabs type="card">
                <TabPane tab="Description" key="1">
                    {description && description}
                </TabPane>
                <TabPane tab="More..." key="2">
                    Call Us on phone numberxxxxxxx to learn more about this product
                </TabPane>
            </Tabs>

            </div>

            <div className="col-md-5">
               {/*{product.title}*/}

               <h1 className="bg-info p-3">
                    {title}
                </h1>
                

               <Card
               
               actions={[
                <>
                  <ShoppingCartOutlined className="text-success"  /> <br/> Add to Cart
                </>,
                <Link to='/'>
                 <HeartOutlined className="text-info" /> <br/>  Add to Wishlist
                </Link>
                 ]}
               
               
               
               > 
                    
                   <ProductListItems product={product} />
               </Card>    
            </div>
        </>
    )
}

export default SingleProduct