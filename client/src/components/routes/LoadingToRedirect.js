import React,{useState,useEffect} from 'react'
import {Route,Link,useHistory} from 'react-router-dom'

const LoadingToRedirect = () =>{
    const [count, setCount] = useState(5)
    let history = useHistory()

    useEffect(() =>{

        const interval =  setInterval(() =>{
            setCount((currentCount) => --currentCount);
        },100);

        //redirect once the count is equal to 0
        count === 0 && history.push("/")

        //cleanup
        return() => clearInterval(interval)

    },[count])


    return(
        <div className="container p-5 text-center">
            <p>Redirect you in {count} seconds</p>
        </div>
    )
}


export default LoadingToRedirect;