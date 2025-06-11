const express=require('express');
const cors=require('cors')
const app=express();
const PORT=process.env.PORT||5000;
const connect=require("../ProFlow-server/config/db")
const userRoutes=require("./routes/auth");
connect();
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Backend is Running");
})
app.use("/user",userRoutes);
app.listen(PORT,()=>{
    console.log("Server is Listening");
})