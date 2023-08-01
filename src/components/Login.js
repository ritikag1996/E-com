import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
const Login=()=>{
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const navigate=useNavigate();
    const loginPage=async(e)=>{
        e.preventDefault();
        console.log(email,password)
        const data=await fetch("http://localhost:4200/login",{
            headers:{'content-type':'application/json'},
             method:"post",
            body:JSON.stringify({email,password})
        });
        const result=await data.json();
        // console.log(result,result.success)
        if(result.success)
        {
        if(result.auth)
        {
            localStorage.setItem("user",JSON.stringify(result.data))
            localStorage.setItem("token",JSON.stringify(result.auth))
            navigate("/")
        }
    }
    else{
        alert("Invalid Credentials");
    }
    }
    useEffect(()=>{
        const auth=localStorage.getItem("user");
        if(auth){
            navigate("/")
        }
    })
    return(
        <form onSubmit={loginPage}>
       <div className='login'>
        <h1>Login</h1>
         <div className="text">
        <label className="label1" >Email ID   :   </label>
        <input type="text" className="input1" placeholder="Enter Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
        </div>
        <div className="text">
        <label className="label1" >Password:   </label>
        <input type="password" className="input1" placeholder="Enter Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required />
        </div>
        <div className="text">
         <button type="submit" className="signButton">Login</button>
        </div>
       </div>
       </form>
    )
}
export default Login;