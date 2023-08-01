import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
const AddComponent=()=>{
    const navigate=useNavigate();
    const[name,setName]=useState('');
    const[price,setPrice]=useState('');
    const[category,setCategory]=useState('');
    const[company,setCompany]=useState('');
    const[error,setError]=useState(false);
    const auth=localStorage.getItem('user');
    let userId=JSON.parse(auth)._id;
    const addProduct=async(e)=>{
        e.preventDefault();
        if(!name || !price || !category || !company){
            setError(true)
            return false;
        }
        const data= await fetch("http://localhost:4200/add-product",{
            headers:{'content-type':'application/json',
            authorization:JSON.parse(localStorage.getItem("token"))},
            method:'post',
            body:JSON.stringify({name,price,category,userId,company})
        })
        const result=await data.json();
       if(result)
       {
       navigate('/')
       }
    }
    return(
        <form onSubmit={addProduct}>
      <div className='product'>
        <h1> Add Product</h1>
        <div > 
            <label>Name   </label>
            <input type="text" placeholder="Enter Product Name" className="input1" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            {error && !name && <span className="validation"> Enter valid name</span>}
        </div>
        <div > 
            <label>Price      </label>
            <input type="text" placeholder="Enter Price" className="input1" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
            {error && !price && <span className="validation"> Enter valid price</span>}
        </div>
        <div > 
            <label>Category</label>
            <input type="text" placeholder="Enter category" className="input1" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
            {error && !category && <span className="validation"> Enter valid category</span>}
        </div>
        <div > 
            <label>Company</label>
            <input type="text" placeholder="Enter company" className="input1" value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
            {error && !company && <span className="validation"> Enter valid company</span>}
        </div>
        <div > 
            <button type="submit" className='signButton'>Add Product</button>
        </div>
      </div>
      </form>
    )
}
export default AddComponent;