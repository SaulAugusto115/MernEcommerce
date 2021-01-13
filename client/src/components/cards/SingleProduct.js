import React from 'react'
import {Card, Tabs,Input} from 'antd'
import {Link} from 'react-router-dom'
import {HeartOutlined,ShoppingCartOutlined} from '@ant-design/icons'
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Laptop from '../../images/laptop.png'
import ProductListItems from './ProductListItems'
import SliderImage from 'react-zoom-slider'
import StarRating from 'react-star-ratings' 
import RatingModal from '../modal/RatingModal'

const {Meta} = Card;

const {TabPane} = Tabs;

const { TextArea } = Input;

const SingleProduct = ({product}) => {

    const {title,images,description,_id} = product;

    /*const data = [
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
      ];*/

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

                
               

                <div>
                  
                  <hr/>
                  <h4>Review</h4>
                </div>
                

               <Card
               
               actions={[
                <>
                  <ShoppingCartOutlined className="text-success"  /> <br/> Add to Cart
                </>,
                <Link to='/'>
                 <HeartOutlined className="text-info" /> <br/>  Add to Wishlist
                </Link>,
                <RatingModal>

                          <StarRating
                            name={_id}
                            numberOfStars={5}
                            rating={2}
                            changeRating={(newRating, name) =>
                              console.log('New Rating',newRating,'Name',name)
                           }

                            isSelectable={true}
                            starRatedColor="red"
                          />

                          <br/>
                          <TextArea showCount maxLength={2500} />

                </RatingModal>

                 ]}
               
               
               
               > 
                    
                   <ProductListItems product={product} />
               </Card>    
            </div>
        </>
    )
}

export default SingleProduct