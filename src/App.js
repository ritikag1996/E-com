import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import AddComponent from "./components/AddComponent";
import Products from "./components/Products";
import UpdateComponents from "./components/UdateComponents";



function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
       <Routes>

        <Route element={<PrivateComponent/>}>
        <Route path="/" element={<Products/>}/>
        <Route path="/add" element={<AddComponent/>}/>
        <Route path="/update/:id" element={<UpdateComponents />}/>
        <Route path="/logout" element={<h1>Logout</h1>}/>
        <Route path="/profile" element={<h1>Profile</h1>}/>
        </Route>
          
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        

       </Routes>
      
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
