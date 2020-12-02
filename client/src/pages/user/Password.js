import React, { useState } from 'react'
import UserNav from '../../components/nav/UserNav'
import {auth} from '../../firebase'
import {toast,ToastContainer} from 'react-toastify'
import {Input} from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone,MailOutlined,GoogleOutlined,FacebookOutlined } from '@ant-design/icons';

const Password = () => {

    const {Password} = Input
    
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)


    const handleSubmit = async (e) =>{

        e.preventDefault();
        //console.log(password)
        setLoading(true)

        await auth.currentUser.updatePassword(password)
        .then(() =>{

            setLoading(false)
            setPassword("")
            toast.success('Password Updated Succesfully');

        }).catch((error) => {
            setLoading(false)
            toast.error(error.message)
        })

    }

    const passwordUpdateForm = () =>{
        return(
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                <label>Your Password</label>
                <br/>
                <br/>
                <Password
                    className="form-control"
                    value={password}
                    placeholder="Enter new password..."
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    onChange={s => setPassword(s.target.value)}
                    autoFocus
                    disabled={loading}
                    value={password}
                 />

                </div>
                <button className="btn btn-primary" disabled={!password || password.length < 7 || loading} >Submit</button>
            </form>
        )
    }

    return (

    <div className="container-fluid p-5">

        <div className="row">
            <div className="col-md-2"><UserNav /></div>
            <div className="col-md-6 offset-md-1">
                {loading ? (<h4 className="text-danger">Loading ...</h4>) : (<h4>Password Update</h4>)}
                {passwordUpdateForm()}
            </div>
        </div>

    </div>
)};

export default Password;