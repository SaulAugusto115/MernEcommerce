import React,{useState} from 'react';
import {auth} from '../../firebase';
import {toast, ToastContainer} from 'react-toastify';
import { Input, Space, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone,MailOutlined } from '@ant-design/icons';
import {useDispatch} from 'react-redux';

const {Password} = Input;


const Login = ({history}) =>{

const [email,setEmail] = useState("sgfarrera@gmail.com");
const [password,setPassword] = useState("12345678");
const [loading,setLoading] = useState(false);

const dispatch = useDispatch();

const handleSubmit = async (e) =>{
  e.preventDefault();
  setLoading(true);

 //console.table(email,password);

 try{

    const result =  await auth.signInWithEmailAndPassword(email,password);

    //console.log(result);
    const {user} = result;
    const idTokenResult = await user.getIdTokenResult();

    dispatch({
        type: "LOGGED_IN_USER",
        payload:{
            email: user.email,
            token: idTokenResult.token
        }
    });

    history.push("/");

 }catch(error)
 {
    console.log(error)
    toast.error(error.message)
    setLoading(false)
 }

};

const loginForm = () => <form onSubmit={handleSubmit}>

    <div className="form-group">
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email..." autoFocus />
    </div>

   
    <br/>

    <div className="form-group">
            {/*<input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password..." autoFocus /> */}

            <Password
            type="password"
            className="form-control"
            value={password}
            placeholder="Enter your password..."
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            onChange={s => setPassword(s.target.value)}
            autoFocus
    />
            
    </div>

   

  
    <br />
    <Button onClick={handleSubmit} type="primary" className="mb-3" block shape="round" icon={<MailOutlined />}  size="large" disabled={!email || password.length < 6}>Login with Email / Password</Button>

</form>


    return( 
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>
                        Login
                    </h4>

                    <ToastContainer />
                  
                    {loginForm()}
                </div>
            </div>

        </div>
    );
}

export default Login;