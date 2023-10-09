const express = require('express');
const userRoutes=require('./userRoutes')
const productRoutes=require('./productRoutes')
const categoryRoutes=require('./categoryRoutes')
const brandRoutes=require('./brandRoutes')
const couponRoutes=require('./couponRoutes')
const orderRoutes=require('./orderRoutes')
const paymentRoutes=require('./paymentRoutes')

const router = express.Router();

router.use('/user',userRoutes);
router.use('/product',productRoutes);
router.use('/category',categoryRoutes);
router.use('/brand',brandRoutes);
router.use('/coupon',couponRoutes);
router.use('/order',orderRoutes);
router.use('/payment',paymentRoutes);
module.exports = router;
