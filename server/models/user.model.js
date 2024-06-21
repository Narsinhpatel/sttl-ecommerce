import { Schema, model } from 'mongoose';

import { hash, compare } from 'bcrypt';
import jwt from "jsonwebtoken"
import validator from 'validator';


//user schema
const UserSchema=Schema({
    
    username:{
        type:String,
        required:[true,"username is required"],
         maxLength:[10,"username is too long.."]

    },
    email:{
        type:String,
        required:[true,"emiil is required"], 
        unique:true,
       validate:[validator.isEmail,"Please enter valid email"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minLength:[6,"password is atlest contains 6 characters"]
        
    },
    gender:{
        type:String,
        required:[true,"gender is required"],
    },
    bio:{
        type:String,
        default:"",
    },
    refreshToken:{
        type:String,
    }
})

//hash password before saving data
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
this.password= await hash(this.password, 10)
    next()
})


//password validation
UserSchema.methods.isPasswordCorrect=async function (password) {
    

  return  await compare(password,this.password)
}



//generate access token
UserSchema.methods.generateAccessToken=function (){

    return jwt.sign(
      {  _id:this._id,
        email:this.email,
        username:this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )

}


//generate refreshtoken
UserSchema.methods.generateRefreshToken=function (){

    return jwt.sign(
      {  _id:this._id,
       
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    )

}

export const User = model("User", UserSchema);

