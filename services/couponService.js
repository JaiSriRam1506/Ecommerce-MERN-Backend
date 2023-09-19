const {StatusCodes}=require('http-status-codes')
const AppError=require('../utils/error/app-error');
const Coupon = require('../models/couponModel');

async function createCoupon(userData){
    try {
        const {name,expiresAt,discount}=userData;
        
        if(!name || !expiresAt || !discount){
            throw new AppError('Coupon Name or expiresAt or discount is missing', StatusCodes.BAD_REQUEST)
        }
        const couponExist= await Coupon.findOne({name});
        if(couponExist) throw new AppError('Coupon name already exists', StatusCodes.BAD_REQUEST)
        const coupon=await Coupon.create({name,expiresAt,discount})
        if(coupon)return coupon;
        else throw new AppError('Unable to create the Coupon:'+coupon, StatusCodes.INTERNAL_SERVER_ERROR)
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Unable to create the Coupon: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}

async function getCoupons(){
    try {
        const coupon=await Coupon.find().sort('-createdAt');
        return coupon;
    } catch (error) {
        throw new AppError('Unable to get all the Coupon: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}

async function getSingleCoupons(name){
    try {
        const coupon=await Coupon.findOne({
            name,
            expiresAt:{$gt:Date.now()}
        });
        if(!coupon)AppError('Unable to find the Coupon or has expired', StatusCodes.INTERNAL_SERVER_ERROR)
        return coupon;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Unable to get the Coupon: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}


async function deleteCoupon(couponId){
    try {
        const coupon=await Coupon.findByIdAndDelete(couponId);
        if(!coupon)throw new AppError('Unable to find the coupon', StatusCodes.NOT_FOUND)
        return coupon;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Unable to delete the Coupon: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}
module.exports={
    createCoupon,
    getCoupons,
    getSingleCoupons,
    deleteCoupon
}
