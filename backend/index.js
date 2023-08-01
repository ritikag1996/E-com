const express = require("express");
const cors = require("cors");
require("./db/dbConnection");
const users = require("./db/users");
const product = require("./db/product");
const Jwt=require('jsonwebtoken');
const app = express();
const { body, validationResult } = require("express-validator");
const bcrypt=require('bcrypt')
const secretKey="e-com";
app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  let success=false;
  let unique=true;
  let salt=await bcrypt.genSaltSync(10);
  let securePassword = await bcrypt.hashSync(req.body.password, salt);
  let data = await users.findOne({email:req.body.email});
  
  if(data)
  {
    unique=false;
    res.send({unique,success,result:"enter Unique email id"})
  }
  else{
  data=new users({name:req.body.name,email:req.body.email,password:securePassword})
  let result = await data.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({result},secretKey,{expiresIn:"1h"},(err,token)=>{
    if(err)
    {
      console.log(err);
      res.send({unique,success,result:"something went wrong"})
    }
    else{
      success=true;
      res.send({unique,success,result,auth:token});
    }
  })
}
});
app.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    let success=false;
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let data = await users.findOne({email:req.body.email})

      if (data) {
        // res.send(data);
        let passwordCompare = await bcrypt.compare(
          req.body.password,
          data.password
        );
        if(!passwordCompare)
        {
          res.send({ success,error: "Invalid Credentials" });
        }
        else{
       
        Jwt.sign({data},secretKey,{expiresIn:"1h"},(err,token)=>{
          if(err)
          {
            console.log(err);
            res.send({success,result:"something went wrong"})
          }
          else{
            success=true;
            res.send({success,data,auth:token});
          }
        })
      }
      }
       else {
        res.send({success, error: "Invalid Credentials" });
      }
    } else {
      res.send(errors.array());
    }
  }
);

app.post("/add-product", verifyToken, async (req, res) => {
  let data = new product(req.body);
  let result = await data.save();
  res.send(result);
});

app.get("/products",verifyToken, async (req, res) => {
  let products = await product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No product added" });
  }
});

app.delete("/delete/:id", verifyToken,async (req, res) => {
  let data = await product.deleteOne({ _id: req.params.id });
  res.send(data);
});
app.put("/update/:id", verifyToken, async (req, res) => {
  let data = await product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(data);
});

app.get("/product/:id",verifyToken, async (req, res) => {
  let data = await product.findOne({ _id: req.params.id });
  if (data) {
    res.send(data);
  } else {
    res.send({ result: "No Record Found" });
  }
});


app.get("/search/:key", verifyToken, async (req, res) => {
  let data = await product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
     
      
    ],
  });
  res.send(data);
});

function verifyToken(req,res,next){
  let token=req.header("Authorization");
  if(!token){
    res.status(403).send({result:"please authenticate using token"})
  }
  else{
     Jwt.verify(token,secretKey,(err,valid)=>{
       if(err)
       {
        res.status(401).send({result:"please authenticate using valid token"}) 
       }
       else
       {
        next();
       }
    });
  }
 
}
app.listen(4200);
