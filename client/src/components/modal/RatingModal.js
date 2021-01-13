import React,{useState,useEffect} from 'react'
import {Modal,Button} from 'antd'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {StarOutlined} from '@ant-design/icons'

const RatingModal = ({children}) => {

    const {user} = useSelector((state) => ({...state}))
    const [modalVisible,setModalVisible] = useState(false)

    return(
        <>
        <div onClick={() => setModalVisible(true)}>
            <StarOutlined className="text-danger" /> <br/> {user ? "Leave a Review" : "Login to Leave a Review"}
        </div> 

        <Modal
            title="Leave your review"
            centered
            visible={modalVisible}
            onOk={() => {
                setModalVisible(false)
                toast.success("Thanks for your review. It will appear soon")
            }}

            onCancel={() =>{
                setModalVisible(false)
            }}
        >
            {children}
        </Modal> 
        </>
    )

}

export default RatingModal