const express = require('express');
const userRoutes=require('./userRoutes')
const productRoutes=require('./productRoutes')

const router = express.Router();

router.use('/user',userRoutes);
router.use('/product',productRoutes);

module.exports = router;
