const express=require('express')
const router=express.Router()

const {CategoryController}=require('../../controllers')
const {UserMiddleware}=require('../../middlewares')


const middlewares=[UserMiddleware.checkAuthentication,UserMiddleware.adminOnly]

router.post('/createCategory',middlewares,CategoryController.createCategory);

router.get('/getCategories',middlewares,CategoryController.getCategory);


router.delete('/deleteCategory/:slug',middlewares,
                        CategoryController.deleteCategory);

module.exports=router;