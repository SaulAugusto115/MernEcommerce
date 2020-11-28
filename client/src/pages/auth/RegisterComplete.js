import React,{useState, useEffect} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import { Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {useDispatch,useSelector}from 'react-redux'

import {createOrUpdateUser} from '../../functions/auth'

const {Password} = Input;






const RegisterComplete = ({history}) =>{

const [email,setEmail] = useState("");
const [password,setPassword] = useState('');

const {user} =useSelector((state) => ({...state}))

const dispatch  = useDispatch()

useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'))
    console.log(window.location.href);
    console.log(window.localStorage.getItem('emailForRegistration'))

    if(user && user.token)
    {
        history.push("/")
    }

}, [user])



const handleSubmit = async (e) =>{

  e.preventDefault();


  //VALIDATION**//
  if(!email || !password)
  {
      toast.error('Email and Password is required')
      return;
  }

  if(password.length < 6)
  {
      toast.error('Password must be 6 characters long')
      return;
  }


  try{

    const result = await auth.signInWithEmailLink(email,window.location.href )

    //console.log('RESULT ',result);

    if(result.user.emailVerified)
    {
        //remove user email from localstorage

        window.localStorage.removeItem('emailForRegistration');


        //get user id token
        let user = auth.currentUser

        await user.updatePassword(password);

        const idTokenResult = await user.getIdTokenResult();

        
        //redux store
        //console.log("user",user,'idTokenResult',idTokenResult)


        createOrUpdateUser(idTokenResult.token)
        .then(
            (res) => dispatch({
                type:"LOGGED_IN_USER",
                payload:{
                    name: user.data.name,
                    email: user.data.email,
                    token: idTokenResult.token,
                    role: res.data.role,
                    _id: res.data._id,
                }
            })
        ).catch((error) =>{
            console.log("ERROR",error)
        })


        //rediret
        history.push('/')

    }

  }catch(error)
  {
    console.log(error);
    toast.error(error.message)
  }



};

const completeRegistrationForm = () => <form onSubmit={handleSubmit}>

    <input type="email" className="form-control" value={email} disabled />
    <br />
    
        {/*<input type="password" className="form-control" value={password} placeholder="Enter your password..."  onChange={e => setPassword(e.target.value)} autoFocus /> */}
        <Password
        className="form-control"
        value={password}
        placeholder="Enter your password..."
        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        onChange={s => setPassword(s.target.value)}
        autoFocus
        />
   
    <br/>
    <br/>
    <button type="submit" className="btn btn-raised">Complete Register</button>
    <br/>
  
   

</form>


    return( 
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>
                        Register Complete
                    </h4>
                  
                    {completeRegistrationForm()}
                </div>
            </div>

        </div>
    );
}

export default RegisterComplete;