import React,{useState,useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const UpdateComponents=()=>{
    const navigate=useNavigate();
    const params=useParams();
    const[name,setName]=useState('');
    const[price,setPrice]=useState('');
    const[category,setCategory]=useState('');
    const[company,setCompany]=useState('');

    useEffect( ()=>{
      getProduct();
      // eslint-disable-next-line 
    },[])
    const getProduct=async()=>{
        let item=await fetch(`http://localhost:4200/product/${params.id}`,{headers:{ authorization:JSON.parse(localStorage.getItem("token"))}});
        item=await item.json();
       setName(item.name);
       setPrice(item.price);
       setCategory(item.category);
       setCompany(item.company);
    }
    const updateProduct=async(e)=>{
       e.preventDefault();
       let res=await fetch(`http://localhost:4200/update/${params.id}`,{ headers:{"content-type":"application/json",
       authorization:JSON.parse(localStorage.getItem("token")),
      }, 
      method:"put",
      body:JSON.stringify({name,price,category,company})})
       res=await res.json();
       if(res)
       {
         navigate('/')
       }
    }
    return(
        <form onSubmit={updateProduct}>
      <div className='product'>
        <h1> Update Product</h1>
        <div > 
            <label>Name   </label>
            <input type="text" placeholder="Enter Product Name" className="input1" value={name} onChange={(e)=>{setName(e.target.value)}}/>
           
        </div>
        <div > 
            <label>Price      </label>
            <input type="text" placeholder="Enter Price" className="input1" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
            
        </div>
        <div > 
            <label>Category</label>
            <input type="text" placeholder="Enter category" className="input1" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
           
        </div>
        <div > 
            <label>Company</label>
            <input type="text" placeholder="Enter company" className="input1" value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
            
        </div>
        <div > 
            <button type="submit" className='signButton'>Update Product</button>
        </div>
      </div>
      </form>
    )
}
export default UpdateComponents;