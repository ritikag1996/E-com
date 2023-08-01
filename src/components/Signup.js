import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
 const Signup=()=>{
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();
    const signupCall=async ()=>{
      console.log(name,email,password);
      const data=await fetch("http://localhost:4200/register",{
         method:"post",
         body:JSON.stringify({name,email,password}),
         headers:{"content-type":"application/json"}
      })
      let result =await data.json();
      // console.log(result.unique,result.success);
          if(result.unique)
          {
            
            if(result.success)
            {
         localStorage.setItem("user",JSON.stringify(result.result))
         localStorage.setItem("token",JSON.stringify(result.auth))
        navigate("/")
            }
            else{
               alert("something went wrong")
            }
          }
          else{
            alert("enter Unique email id")
          }
      

    }
    // after signup if u enter in browser /signup it will retrieve to product page
    useEffect(()=>{
      const auth=localStorage.getItem("user");
      if(auth){
          navigate("/")
      }
  })
    return(
     <div className='register'>
        <h1>Register</h1>
        <div className="text">
        <label className="label1" >Username :   </label>
        <input type="text" className="input1" placeholder="enter name" value={name} onChange={(e)=>{setName(e.target.value)}} />
        </div>
        <div className="text">
       <label className="label1">Email ID   :   </label>
       <input type="text" className="input1" placeholder="enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}  />
        </div>
        <div className="text">
        <label className="label1">Password: </label>
        <input type="password" className="input1" placeholder="enter password" value={password} onChange={(e)=>{setPassword(e.target.value)}}  />
        </div>
        <div className="text">
            <button type="submit" className="signButton" onClick={signupCall} >Sign up</button>
        </div>
     </div>
    )
 }
 export default Signup;