const {StatusCodes}=require('http-status-codes')
const {ErrorResponse,SuccessResponse}=require('../utils/common')
const {OrderService}=require('../services')
const {ServerConfig}=require('../config/index')


async function createOrder(req,res){
    try {
        const response=await OrderService.createOrder({
            orderDate:req.body.orderDate,
            orderTime:req.body.orderTime,
            orderAmount:req.body.orderAmount,
            orderStatus:req.body.orderStatus,
            paymentMethod:req.body.orderMethod,
            cartItems:req.body.cartItems,
            shippingAddress:req.body.shippingAddress,
            billingAddress:req.body.billingAddress,
            paymentMethod:req.body.paymentMethod,
            coupon:req.body.coupon
        },req.user._id.toString(),req)
            SuccessResponse.data=response;
            SuccessResponse.message="Order Created Successfully";
            return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message=error.explanation;
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function getOrders(req,res){
    try {
        const response=await OrderService.getOrders(req.user);
            SuccessResponse.data=response;
            SuccessResponse.message="Orders retrieved Successfully";
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message=error.explanation;
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function getOrderbyId(req,res){
    try {
        const response=await OrderService.getOrderbyId(req.user,req.params.id)
            SuccessResponse.message="Single Order retrieved Successfully";
            SuccessResponse.data=response;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message=error.explanation;
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function updateOrderStatus(req,res){
    try {
        const response=await OrderService.updateOrderStatus(req.params.id,req.body.status)
            SuccessResponse.message="Order status updated Successfully";
            SuccessResponse.data=response;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message=error.explanation;
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports={
    createOrder,
    getOrders,
    getOrderbyId,
    updateOrderStatus,
}