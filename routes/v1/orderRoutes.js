const express=require('express')
const router=express.Router()

const {OrderController}=require('../../controllers')
const {UserMiddleware}=require('../../middlewares')


const middlewares=[UserMiddleware.checkAuthentication,UserMiddleware.adminOnly]

router.post('/createOrder',UserMiddleware.checkAuthentication,OrderController.createOrder);

router.get('/getOrders',UserMiddleware.checkAuthentication,OrderController.getOrders);
router.get('/getOrder/:id',UserMiddleware.checkAuthentication,OrderController.getOrderbyId);


router.patch('/updateStatus/:id',middlewares,
                        OrderController.updateOrderStatus);

module.exports=router;