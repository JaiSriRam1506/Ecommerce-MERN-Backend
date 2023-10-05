const express=require('express')
const router=express.Router()

const {CouponController}=require('../../controllers')
const {UserMiddleware}=require('../../middlewares')


const middlewares=[UserMiddleware.checkAuthentication,UserMiddleware.adminOnly]

router.post('/createCoupon',middlewares,CouponController.createCoupon);

router.get('/getCoupons',middlewares,CouponController.getCoupons);
router.get('/getCoupon/:coupon',CouponController.getSingleCoupons);


router.delete('/deleteCoupon/:id',middlewares,
                        CouponController.deleteCoupon);

module.exports=router;