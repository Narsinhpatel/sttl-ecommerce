
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse}  from "../utils/ApiResponse.js"
import {User}  from "../models/user.model.js"

//generate access token
const generateAccessAndrefreshTokens=async(userId)=>{

    try {
        
        const user=await User.findById(userId)
       const accessToken= user.generateAccessToken()
      const refreshToken=  user.generateRefreshToken()

   
   user.refreshToken=refreshToken
    const data=await user.save({validateBeforeSave:false})


   
   return {accessToken,refreshToken}

    } catch (error) {
       
            throw new ApiError(500,"somthing went wrong while generating Token")
      
    }
}

//register user
const registerUser=asyncHandler(async(req,res,)=>{

// get data from  req.body

const {username,email,password,gender,bio}=req.body

//console.log(username,email,password,gender,bio)

//validate

if ( [username,email,password,gender].some((field)=>field?.trim()==="")) {

   

  throw new ApiError(400,"All field are Requried")
    
}
//user exists or not

  const existedUser= await User.findOne({email})

  if(existedUser){
      
      
      throw new ApiError(409,"User Already exist with this email Id")
    }
    
    //save to database
  const user=await User.create({
  username:username.toLowerCase(),email,password,gender,bio

  })

  


  //create user
  const createduser=await User.findById(user._id).select(
    "-password -refreshToken"
  )


  if (!createduser) {
    throw new ApiError(500,"somthing went wrong while registering user")
  }

 return res.status(201).json(
    new ApiResponse(200,createduser,"user created successfully")
 )
})


//login user 

const loginUser=asyncHandler(async(req,res,next)=>{

    //get data from frontend
    
    const {email,password} =req.body
    

    //validate
    if (!email) {
        throw new ApiError(400,"Email is required ")
    }
    if (!password) {
        throw new ApiError(400,"password is required ")
    }
    //find the user
    const user=await User.findOne({email})

    if (!user) {
        throw new ApiError(400,"User is not exist")
    }
    
    //password check
    const isPasswordValid=  await user.isPasswordCorrect(password)
    
    if (!isPasswordValid) {
        throw new ApiError(401,"Password is Incorrect ")
    }
    //access and refresh token
    const {accessToken,refreshToken}=await generateAccessAndrefreshTokens(user._id)

    //send cookie
    const loggedInUser=await User.findOne({email}).select("-password -refreshToken")
        const options={
            httpOnly:false,
            secure:false,
        }

        return res.status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new ApiResponse(200,{
                user:loggedInUser,accessToken,refreshToken
            },
        "User login Successfully")
        )
})


//logout user
const logoutUser=asyncHandler(async(req,res)=>{


   const data= await User.findByIdAndUpdate(req.user._id,{
        $set:{
         refreshToken:undefined   
        },
    },{
        new:true
    })
    const options={
        httpOnly:false,
        secure:false,
    }



    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"logout succesfull"))
    
})
export{loginUser,logoutUser,registerUser}