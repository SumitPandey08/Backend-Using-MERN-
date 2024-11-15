import asyncHandler from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.module.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import {} from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req , res) => {
    
    const {fullName , email , username , password} = req.body
    console.log("email :" , email ) ;

    if (
        [fullName , email , username , password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError( 400 , "Please fill in all fields");
        
    }
    
   const existedUser = await User.findOne({
        $or : [{ username } , { email } ]
    })

    if(existedUser){
        throw new ApiError( 409 , "Username or Email already exists");
    }


    const avatarLocalPath = req.files?.avatar[0]?.path  ;
    const coverImageLocalPath = req.files?.coverImage[0]?.path ; 

    if (!avatarLocalPath) {
        throw new ApiError(400, "Please upload an avatar");
        
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Failed to upload avatar")
    }

    const user = await User.create({
        fullName ,
        avatar : avatar.url,
        coverImage : coverImage?.url || "" ,
        email ,
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Some Thing Went Wrong and Failed to create user") ;
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
    })

    



    


export {registerUser}