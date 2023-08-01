import React from "react";
import { Link,useNavigate } from "react-router-dom";
const Navbar = () => {
  const auth=localStorage.getItem("user");
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/signup')
  }
  return (
    <div>
      <img  className="logo" alt="logo" src="https://freevector-images.s3.amazonaws.com/uploads/vector/preview/36682/36682.png"/>
     {auth? <ul className="nav-ul">
      <li>
        <Link to="/">Products</Link>
      </li>
      <li>
        <Link to="/add">Add Products</Link>
      </li>
      <li>
        <Link to="/update">Update Products</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li><Link to="/signup" onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
      </ul>
     :
      <ul className="nav-ul right">
      <li> <Link to="/login">Login</Link></li>
        <li><Link to="/signup">Sign up</Link></li>
       </ul>
}
       
    </div>
  )
}

export default Navbar;
