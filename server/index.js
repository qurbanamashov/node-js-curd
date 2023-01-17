const express = require('express');
const app = express();
const bodyParser=require("body-parser");
const cors = require("cors");
const port = 4000;
let idCounter=3;
let users = [
    {id:1,user:"Qurban Amashov",name:"Qurban", surname:"Amashov", mail:"qurban2003@gmail.com"},
    {id:2,user:"Resul Qurbanov",name:"Resul", surname:"Qurbanov", mail:"resul2003@gmail.com"}
];
app.use(cors())
app.use(bodyParser.json());
app.get("/users",(req,res)=>{
    res.send(users)
})
app.get("/users/:id",(req,res)=>{
    const id =req.params.id
    const selectUser=users.find((x)=> x.id == id)
    if(selectUser){
        res.send(selectUser)
        res.status(200)
    }
    else{
        res.status(404).json({massage:"bu user tapilmadi"})
    }
})
app.delete("/users/:id",(req,res)=>{
    const id = +req.params.id
    users = users.filter((x)=>x.id!==id)
    res.send(users)
    res.status(200).json({message:"Delete"})
})
app.post("/users",(req,res)=>{
    const userobj={
        id: idCounter++,
        user: req.value.user,
        name: req.value.name,
        surname: req.value.surname,
        mail: req.value.mail,
    };
    users.push(userobj);
    res.end();
})
app.post("users/:id", (req,res)=>{
    const {id}=req.params.id
    users=users.filter(x=>x.id!=id)
    const updateUsers={
        id: id,
        user: req.body.user,
        name: req.body.name,
        surname: req.body.surname,
        mail: req.body.mail,
    }
    users.push(updateUsers);
    res.end();
})
app.listen(port,()=>{
    console.log("server running")
})