const {StatusCodes}=require('http-status-codes')
const {ErrorResponse,SuccessResponse}=require('../utils/common')
const {CouponService}=require('../services')
const {ServerConfig}=require('../config/index')


async function createCoupon(req,res){
    try {
        const response=await CouponService.createCoupon({
            name:req.body.name,
            expiresAt:req.body.expiresAt,
            discount:req.body.discount
        })
            SuccessResponse.data=response;
            SuccessResponse.message="Coupon Created Successfully";
            return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function getCoupons(req,res){
    try {
        const response=await CouponService.getCoupons();
            SuccessResponse.data=response;
            SuccessResponse.message="All Coupons retrieved Successfully";
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function getSingleCoupons(req,res){
    try {
        const response=await CouponService.getSingleCoupons(req.body.name);
            SuccessResponse.data=response;
            SuccessResponse.message="Single Coupon retrieved Successfully";
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function deleteCoupon(req,res){
    try {
        const response=await CouponService.deleteCoupon(req.params.id)
            SuccessResponse.message="Coupon deleted Successfully";
            SuccessResponse.data=response;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

module.exports={
    createCoupon,
    getCoupons,
    getSingleCoupons,
    deleteCoupon
}