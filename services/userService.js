const {StatusCodes}=require('http-status-codes')
const AppError=require('../utils/error/app-error');
const User = require('../models/userModel');
const Auth=require('../utils/common/auth')



async function createUser(userData){
    try {
        const {name,email,password}=userData;
        const userExists=await User.findOne({email});
        if(userExists){
            throw new AppError('User already Exists', StatusCodes.BAD_REQUEST)
        }
        const user= await User.create({
            name,
            email,
            password
        })
        const jwtToken=Auth.createToken({_id:user._id});
        if(user) return {user,jwtToken}
        else{
            throw new AppError('Unable to Register the User', StatusCodes.INTERNAL_SERVER_ERROR)
        }
    } catch (error) {
        if(error instanceof AppError) throw error;
        //console.log(error)
        throw new AppError('Unable to register the User: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}

async function signIn(userData){
    try {
        const {email,password}=userData;
        const user=await User.findOne({email});
        if(!user){
            throw new AppError('Cannot find User in the DataBase',StatusCodes.NOT_FOUND);
        }
        const passwordMatch= Auth.checkPassword(password,user.password);
        if(!passwordMatch){
            throw new AppError('Password don\'t match ',StatusCodes.NOT_FOUND);
        }

        if(user.email!=email){
            throw new AppError('Invalid User',StatusCodes.NOT_FOUND)
        }

        const jwtToken=Auth.createToken({_id:user._id});
        if(user && jwtToken) return {user,jwtToken};
        else{
            throw new AppError('Unable to Login', StatusCodes.INTERNAL_SERVER_ERROR)
        }
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Unable to Login: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}

async function isAuthenticated(token){
    try {
        const response=Auth.verifyToken(token);
        if(!response)throw error;

        if(response)
        {
            const user= await User.findById(response._id);
            if(!user){
                throw new AppError('User not found',StatusCodes.NOT_FOUND);
            }
            return user;
        }
    } catch (error) {
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError') {
            throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST);
        }
        if(error.name=='TokenExpiredError'){
            throw new AppError('JWT Token has been expired',StatusCodes.BAD_REQUEST)
        }
        throw new AppError("Unable to authenticate to the Server",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function userUpdate(req){
    try {
        const user= await User.findById(req.user._id);
        if(!user){
            throw new AppError('User not found',StatusCodes.NOT_FOUND);
        }
        
        const {name,phone,address}=user;
        user.name=req.body.name || name;
        user.name=req.body.name || name;
        user.address={
            address:req.body.address.address || address.address,
            state:req.body.address.state || address.state,
            country:req.body.address.country || address.country
        }
        const updatedUser = await user.save();
        return updatedUser;
    } catch (error) {
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError') {
            throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST);
        }
        if(error.name=='TokenExpiredError'){
            throw new AppError('JWT Token has been expired',StatusCodes.BAD_REQUEST)
        }
        throw new AppError("Unable to authenticate to the Server",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updatePhoto(req){
    try {

        const user= await User.findById(req.user._id);
        if(!user){
            throw new AppError('User not found',StatusCodes.NOT_FOUND);
        }
        
        const {photo}=user;
        user.photo=req.body.photo || photo;
        const updatedUser = await user.save();
        return updatedUser;

    } catch (error) {
        //console.log(error);
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError') {
            throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST);
        }
        if(error.name=='TokenExpiredError'){
            throw new AppError('JWT Token has been expired',StatusCodes.BAD_REQUEST)
        }
        throw new AppError("Unable to authenticate to the Server",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function saveToCart(req){
    try {

        const user= await User.findById(req.user._id);
        if(!user){
            throw new AppError('User not found',StatusCodes.NOT_FOUND);
        } 
        const {cartItems}=user;
        user.cartItems=req.body.cartItems || cartItems;
        const cart = await user.save();
        return cart;

    } catch (error) {
        //console.log(error);
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError') {
            throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST);
        }
        if(error.name=='TokenExpiredError'){
            throw new AppError('JWT Token has been expired',StatusCodes.BAD_REQUEST)
        }
        throw new AppError("Unable to authenticate to the Server",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCart(req){
    try {

        const user= await User.findById(req.user._id);
        if(!user){
            throw new AppError('User not found',StatusCodes.NOT_FOUND);
        } 
        return user.cartItems;

    } catch (error) {
        //console.log(error);
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError') {
            throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST);
        }
        if(error.name=='TokenExpiredError'){
            throw new AppError('JWT Token has been expired',StatusCodes.BAD_REQUEST)
        }
        throw new AppError("Unable to authenticate to the Server",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createUser,
    signIn,
    isAuthenticated,
    userUpdate,
    updatePhoto,
    saveToCart,
    getCart
}