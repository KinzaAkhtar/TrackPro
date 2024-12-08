import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./env"
})
const port = process.env.PORT || 8000
connectDB()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`server is listening to :${port}`)
    })
})
.catch(()=>{
    console.log("MONGO db Connection Failed!!!!",err);
})


