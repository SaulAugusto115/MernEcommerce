import logo from './logo.svg';
//import './App.css';
import React,{useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/nav/Header';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';
import History from './pages/user/History'
import Password from './pages/user/Password'
import Wishlist from './pages/user/Wishlist'
import UseRoute from './components/routes/UserRoute'
import AdminRoute from './components/routes/AdminRoute'

//admin category dashboard actions
import CategoryCreate from './pages/admin/category/CategoryCreate'
import CategoryUpdate from './pages/admin/category/CategoryUpdate'


//admin sub category actions
import SubCategoryCreate from './pages/admin/subCategory/SubCategoryCreate'
import SubCategoryUpdate from './pages/admin/subCategory/SubCategoryUpdate'

//admin Product actions
import ProductCreate from './pages/admin/product/ProductCreate'
import AllProducts from './pages/admin/product/AllProducts'
import ProductUpdate from './pages/admin/product/ProductUpdate'
import Product from './pages/Product'

//admin dashbaord
import AdminDashboard from './pages/admin/AdminDashboard'


//firebase imports
import {auth} from './firebase';
import {useDispatch} from 'react-redux'
import {currentUser} from './functions/auth'

const App = () =>  {

const dispatch = useDispatch();

//to check firebase auth state
useEffect(() => {

  const unsubscribe = auth.onAuthStateChanged(async (user) =>{
      if(user)
      {
        const idTokenResult = await user.getIdTokenResult()

        console.log("user",user);


        currentUser(idTokenResult.token)
        .then( (res) =>{

          dispatch({
            type:"LOGGED_IN_USER",
            payload:{
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id
            }
          })

        }).catch((error) =>{
          console.log(error)
        })

        /*dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            //displayName: user.displayName,
            token: idTokenResult.token,
          },
        }); */

        //cleanup

        return () => unsubscribe();


      }
  })

},[])

  return (
    <>
        <Header />
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/register/complete" component={RegisterComplete} />
          <Route exact path="/forgot/password"component={ForgotPassword} />
          <UseRoute exact path="/user/history" component={History} />
          <UseRoute exact path="/user/password" component={Password} />
          <UseRoute exact path="/user/wishlist" component={Wishlist} />

          {/* Admin Routes*/}
          <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
          <AdminRoute exact path="/admin/category" component={CategoryCreate} />
          <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
          <AdminRoute exact path="/admin/subcategory" component={SubCategoryCreate} />
          <AdminRoute exact path="/admin/subcategory/:slug" component={SubCategoryUpdate} />
          <AdminRoute exact path="/admin/product" component={ProductCreate} />
          <AdminRoute exact path="/admin/products" component={AllProducts} />
          <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />

          <Route exact path="/product/:slug" component={Product} />
        </Switch>
    </>
  );
}


export default App;
