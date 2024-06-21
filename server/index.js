import express, { json } from 'express';
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { connect } from 'mongoose';
const app=express()
dotenv.config({
    path: "./.env",
  });


app.use(json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))
//routes import
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';

//routes declaration

app.use("/api/v1/users",userRouter)
app.use("/api/v1/products",productRouter)

connect(`${process.env.MONGODB_URI}/user`).then(()=>{

    console.log('connection Successfull with database')
    }).catch((err)=>{
        console.log(err)
        })

app.listen(process.env.PORT,()=>{

    console.log("serever started at port 3000....")
})