const express=require('express')
const router=express.Router()

const {BrandController}=require('../../controllers')
const {UserMiddleware}=require('../../middlewares')


const middlewares=[UserMiddleware.checkAuthentication,UserMiddleware.adminOnly]

router.post('/createBrand',middlewares,BrandController.createBrand);

router.get('/getBrands',middlewares,BrandController.getBrand);


router.delete('/deleteBrand/:slug',middlewares,
                        BrandController.deleteBrand);

module.exports=router;