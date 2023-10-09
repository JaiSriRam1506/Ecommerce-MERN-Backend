const express=require('express')
const router=express.Router()

const {PaymentController}=require('../../controllers')
const {UserMiddleware}=require('../../middlewares')


const middlewares=[UserMiddleware.checkAuthentication,UserMiddleware.adminOnly]

router.post('/stripe-payment-intent',PaymentController.payWithStripe);


module.exports=router;