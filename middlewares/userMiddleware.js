const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");
const {UserService}=require('../services')
const Auth=require('../utils/common/auth')

function validateCreateUserRequest(req,res,next){
    const {name,email,password}=req.body;

    if(!email || !name || !password || password.length<6 ){
        ErrorResponse.message="Something is wrong while Creating User"
        ErrorResponse.error=new AppError(['Name or Email or Password no is not in proper format'],StatusCodes.BAD_REQUEST);

    return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse)

    }
    next();

}

function validateSignIn(req,res,next){
    const {email,password}=req.body;

    if(!email || !password || password.length<6 ){
        ErrorResponse.message="Something wrong while Login User"
        ErrorResponse.error=new AppError(['Email or Password no is not in proper format'],StatusCodes.BAD_REQUEST);

    return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse)

    }
    next();

}

async function checkAuthentication(req,res,next){
    try {
        const token=req.cookies.token;
        if(!token) throw new AppError('Please provide Access Token or Login first',StatusCodes.BAD_REQUEST);
        const response= await UserService.isAuthenticated(token);
        if(!response)throw new AppError(['User not found, Please login with Valid Id'],StatusCodes.UNAUTHORIZED)
        if(response){
            req.user=response;
            next();
        }
    } catch (error) {
        return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(error)
    }
}

async function checkAuthenticationStatus(req,res,next){
    try {
        const token=req.cookies.token;
        if(!token) return res.json(false);
        const response=Auth.verifyToken(token);
        if(!response) return res.json(false);
        return res.json(true);
    } catch (error) {
        return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(false)
    }
}

async function adminOnly(req,res,next){
    try {
        if(req?.user && req?.user?.role==='admin')next();
        else  throw new AppError(['User is not authorized to do the required action'],StatusCodes.UNAUTHORIZED);
    } catch (error) {
        return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(error)
    }
}

module.exports={
    validateCreateUserRequest,
    validateSignIn,
    checkAuthentication,
    checkAuthenticationStatus,
    adminOnly
}