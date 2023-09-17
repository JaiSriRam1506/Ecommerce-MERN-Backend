const {StatusCodes}=require('http-status-codes')
const {ErrorResponse,SuccessResponse}=require('../utils/common')
const {UserService}=require('../services')
const {ServerConfig}=require('../config/index')
const User =require('../models/userModel')


async function createUser(req,res){
    try {
        const response=await UserService.createUser({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
            const {user,jwtToken}=response;
            const { _id, name, email, phone, role } = user
            SuccessResponse.data={ _id, name, email, phone, role,jwtToken};
            SuccessResponse.message="Registration Successful";
            return res
                .status(StatusCodes.CREATED)
                .cookie("token", jwtToken, {
                    path: "/",
                    httpOnly: true,
                    expiresIn: ServerConfig.JWT_EXPIRY, // 1 day
                    sameSite: "none",
                    secure: true,
                  })
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(400)
                .json(ErrorResponse);
    }
}

async function signIn(req,res){
    try {
        const response=await UserService.signIn({
            email:req.body.email,
            password:req.body.password
        })
            const {user,jwtToken}=response;
            const { _id, name, email, phone, role } = user;
            SuccessResponse.data={ _id, name, email, phone, role,jwtToken};
            SuccessResponse.message="Login Successful";
            return res
                .status(StatusCodes.CREATED)
                .cookie("token", jwtToken, {
                    path: "/",
                    httpOnly: true,
                    expiresIn: ServerConfig.JWT_EXPIRY, // 1 day
                    sameSite: "none",
                    secure: true,
                  })
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(400)
                .json(ErrorResponse);
    }
}

async function logout(req,res){
    try {
            SuccessResponse.data={jwtToken:""};
            SuccessResponse.message="Logout Successful";
            return res
                .status(StatusCodes.OK)
                .cookie("token", "", {
                    path: "/",
                    httpOnly: true,
                    expiresIn: 0, // 1 day
                    sameSite: "none",
                    secure: true,
                  })
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(400)
                .json(ErrorResponse);
    }
}

async function getUser(req,res){
    try {
            const user= await User.findById(req.user._id).select("-password");
            SuccessResponse.message="Successfully retrieved the User data";
            SuccessResponse.data=user;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(400)
                .json(ErrorResponse);
    }
}

async function updateUser(req,res){
    try {
            const updatedUser= await UserService.userUpdate(req)
            const user= await User.findById(updatedUser._id).select("-password");
            SuccessResponse.message="Successfully updated the User data";
            SuccessResponse.data=user;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(400)
                .json(ErrorResponse);
    }
}

async function updatePhoto(req,res){
    try {
            const updatedUser= await UserService.updatePhoto(req)
            const user= await User.findById(updatedUser._id).select("-password");
            SuccessResponse.message="Successfully updated the User photo";
            SuccessResponse.data=user;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(400)
                .json(ErrorResponse);
    }
}

module.exports={
    createUser,
    signIn,
    getUser,
    logout,
    updateUser,
    updatePhoto
}