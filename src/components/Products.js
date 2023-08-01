import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Products=()=>{
  
  const navigate=useNavigate();
    const[products,setProducts]=useState([]);
    const[search,setSearch]=useState("");
    useEffect(()=>{
        productList();
       // eslint-disable-next-line  
    },[])
    const productList=async()=>{
        let result =await fetch("http://localhost:4200/products",{
            headers:{authorization:JSON.parse(localStorage.getItem("token"))}
        });
        let data=await result.json();
        setProducts(data);
    
    }
    const deleteProduct=async(id)=>{
        let res= await fetch(`http://localhost:4200/delete/${id}`,{method:"delete",
        headers:{authorization:JSON.parse(localStorage.getItem("token"))}});
            res=await res.json();
            if(res){
                productList();
            }
             
    }

    const updateProduct=(id)=>{
        navigate(`/update/${id}`)
    }
    const searchItem=async()=>{
        if(search)
        {
        let item=await fetch(`http://localhost:4200/search/${search}`,
        {
            headers:{authorization:JSON.parse(localStorage.getItem("token"))}
        }
        );
        item=await item.json();
        if(item){
       setProducts(item);
        }
    }
        else{
            productList();
        }
       
        
    }
    return(
      <div className="products">
        <h1>Products List</h1>
        <div className="search">
        <input type="text" placeholder='search' value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
        <button type="submit" onClick={searchItem}>Search</button>
        </div>
        <ul>
            <li>S.NO</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Operation</li>
        </ul>
        {
            products.length>0?products.map((item,index)=>{
               return(
              
               <ul key={item._id}>
                <li>{index}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
                <li> <button type="submit" onClick={()=>deleteProduct(item._id)}>Delete</button><span> </span><button type="submit"onClick={()=>updateProduct(item._id)} >Update</button></li>
            </ul>
            
            
               )
            }): <h3>No Result found</h3>
        }
        
        </div>

    )
}
export default Products;