const express=require('express')
const router=express.Router()

const {ProductController}=require('../../controllers')
const {UserMiddleware}=require('../../middlewares')


const middlewares=[UserMiddleware.checkAuthentication,UserMiddleware.adminOnly]
router.post('/',middlewares,
                        ProductController.createProduct);

router.get('/',ProductController.getProducts);

router.get('/:id',ProductController.getProduct);

router.delete('/:id',middlewares,
                        ProductController.deleteProduct);

router.patch('/:id',middlewares,
                                ProductController.updateProduct);

router.post('/review/:id',UserMiddleware.checkAuthentication,
                        ProductController.reviewProduct);

router.delete('/deleteReview/:id',UserMiddleware.checkAuthentication,
                        ProductController.deleteReview);
                        
router.patch('/updateReview/:id',UserMiddleware.checkAuthentication,
                        ProductController.updateReview);


module.exports=router;