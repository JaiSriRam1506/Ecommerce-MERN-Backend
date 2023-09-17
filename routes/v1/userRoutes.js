const express=require('express')
const router=express.Router()

const {UserController}=require('../../controllers')
const {UserMiddleware}=require('../../middlewares')

/*router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });
*/


router.post('/register',UserMiddleware.validateCreateUserRequest,
                        UserController.createUser);

router.post('/login',UserMiddleware.validateSignIn,
                        UserController.signIn);

router.post('/logout',UserController.logout);

router.get('/getUser',UserMiddleware.checkAuthentication,
                        UserController.getUser);
router.get('/loginStatus',UserMiddleware.checkAuthenticationStatus);

router.patch('/updateUser',UserMiddleware.checkAuthentication,
                        UserController.updateUser);

router.patch('/updatePhoto',UserMiddleware.checkAuthentication,
                        UserController.updatePhoto);                        

module.exports=router;