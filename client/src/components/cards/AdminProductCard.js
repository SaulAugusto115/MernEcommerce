import React from 'react'
import { Card } from 'antd';
import laptop from '../../images/laptop.png'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'

const { Meta } = Card;

const AdminProductCard = ({product,handleRemove}) => {

    //destructure
    const {title,description,images,slug} = product

    return(
        <Card cover={ <img src={images && images.length ? images[0].url : laptop} 
        style={{height: '270px', objectFit: 'cover'}} className="p-1" /> } 
        actions={[
            <EditOutlined  className="text-primary" />,
            <DeleteOutlined onClick={() => handleRemove(slug)} className="text-danger" />
        ]} >
            
            <Meta title={title} description={`${description && description.substring(0,40)}...`} />
            
        </Card>

    )
}

export default AdminProductCard