import React,{useState,useEffect} from 'react';
import {auth, googleAuthProvider, facebookAuthProvider} from '../../firebase';
import {toast, ToastContainer} from 'react-toastify';
import { Input, Space, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone,MailOutlined,GoogleOutlined,FacebookOutlined } from '@ant-design/icons';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom'

const {Password} = Input;


const Login = ({history}) =>{

const [email,setEmail] = useState("sgfarrera@gmail.com");
const [password,setPassword] = useState("Muukalainen115");
const [loading,setLoading] = useState(false);

const dispatch = useDispatch();


const {user} = useSelector((state) => ({...state}))


useEffect(() =>{

    if(user && user.token)  history.push("/");
    

},[user]);

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

const googleLogin = async () =>{
    auth.signInWithPopup(googleAuthProvider)
    .then( async (result) =>{
        const {user} = result
        const idTokenResult = await user.getIdTokenResult()

        dispatch({
            type: "LOGGED_IN_USER",
            payload: {
                email: user.email,
                displayName: user.displayName,
                token: idTokenResult.token               
            }
        });

        history.push("/")
        
    }).catch((error) => {
        console.log(error)
        toast.error(error.message)
    })
}


const facebookLogin = async () =>{
    auth.signInWithPopup(facebookAuthProvider)
    .then(async (result) =>{
        const {user} = result
        const idTokenResult = await user.getIdTokenResult()

        dispatch({
            type:"LOGGED_IN_USER",
            payload:{
                email: user.email,
                displayName: user.displayName,
                token: idTokenResult.token
            }
        });

        history.push("/")
    }).catch((error) =>{
        console.log(error)
        toast.error(error.message)
    })
}

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
            placeholder="Your password..."
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            onChange={s => setPassword(s.target.value)}
            autoFocus
    />
            
    </div>

   

  
    <br />
    <Button onClick={handleSubmit} type="secondary" className="mb-3" block shape="round" icon={<MailOutlined />}  size="large" disabled={!email || password.length < 6}>Login with Email / Password</Button>

</form>


    return( 
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                   
                    {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Login</h4> }

                    <ToastContainer />
                  
                    {loginForm()}



                    <Button onClick={googleLogin} type="danger" className="mb-3" block shape="round" icon={<GoogleOutlined />}  size="large" >Login with Google</Button>

                    <Button onClick={facebookLogin} type="primary" className="mb-3" block shape="round" icon={<FacebookOutlined />}  size="large" >Login with Facebook</Button>



                    <Link to="/forgot/password" className="text-danger float-right">Forgot Password ?</Link>
                </div>
            </div>

        </div>
    );
}

export default Login;