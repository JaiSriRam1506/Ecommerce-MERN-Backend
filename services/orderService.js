const {StatusCodes}=require('http-status-codes')
const AppError=require('../utils/error/app-error');
const Order = require('../models/orderModel')

async function createOrder(orderData,userID){
    try {
        const {orderDate,orderTime,orderAmount,orderStatus,paymentMethod,
            cartItems,shippingAddress,coupon,billingAddress}=orderData;
        
        if(!orderDate || !orderTime || !orderAmount || !orderStatus || !paymentMethod || !cartItems.length || !shippingAddress || !billingAddress){
            throw new AppError('Some of the order information is missing', StatusCodes.BAD_REQUEST)
        }
        const order=await Order.create({
            user:userID,
            orderDate,
            orderTime,
            orderAmount,
            orderStatus,
            paymentMethod,
            cartItems,
            shippingAddress,
            billingAddress,
            coupon:coupon?coupon:{name:'nil'}
        })
        return order;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Unable to create the Order: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}

async function getOrders(user){
    try {
        let Orders;
        if(user.role==='admin'){
            Orders= await Order.find().sort('createdAt');
            return Orders;
        }
        Orders= await Order.find({
            user:user._id
        }).sort('createdAt')
        return Orders;
    } catch (error) {
        throw new AppError('Unable to get all the orders: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}

async function getOrderbyId(user,orderId){
    try {
        const order=await Order.findById(orderId);
        if(!order)throw new AppError('Order not found: '+order, StatusCodes.NOT_FOUND);
        if(user.role==='admin'){
            return order;
        }
        if(order.user.toString()!==user._id.toString()){
            throw new AppError('User is not authorized to access the order', StatusCodes.UNAUTHORIZED)
        }
        return order;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Unable to get the order: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}


async function updateOrderStatus(orderId,orderStatus){
    try {
        const order=await Order.findById(orderId);
        if(!order)throw new AppError('Unable to find or doesn\'t exists the Order: '+order, StatusCodes.NOT_FOUND);

        const updatedOrder=await Order.findOneAndUpdate(
            {
                _id:orderId
            },
            {
                orderStatus
            },
            {
                new:true,
                runValidators:true
            }
        )
        return updatedOrder;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Unable to update status of the order: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}
module.exports={
    createOrder,
    getOrders,
    getOrderbyId,
    updateOrderStatus
}
