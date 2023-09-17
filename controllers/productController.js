const {StatusCodes}=require('http-status-codes')
const {ErrorResponse,SuccessResponse}=require('../utils/common')
const {ProductService}=require('../services')
const {ServerConfig}=require('../config/index')


async function createProduct(req,res){
    try {
        const response=await ProductService.createProduct({
            name:req.body.name,
            sku:req.body.sku,
            category:req.body.category,
            brand:req.body.brand,
            color:req.body.color,
            quantity:req.body.quantity,
            sold:req.body.sold,
            regularPrice:Number(req.body.regularPrice),
            price:Number(req.body.price),
            description:req.body.description,
            image:req.body.image,
            ratings:req.body.ratings
        })
            SuccessResponse.data=response;
            SuccessResponse.message="Product Created Successfully";
            return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function getProducts(req,res){
    try {
        const response=await ProductService.getProducts();
            SuccessResponse.data=response;
            SuccessResponse.message="All Products retrieved Successfully";
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function getProduct(req,res){
    try {
        const response=await ProductService.getProduct(req.params.id)
            SuccessResponse.data=response;
            SuccessResponse.message="Single Product retrieved Successfully";
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function deleteProduct(req,res){
    try {
        const response=await ProductService.deleteProduct(req.params.id)
            SuccessResponse.message="Product deleted Successfully";
            SuccessResponse.data=response;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function updateProduct(req,res){
    try {
        const response=await ProductService.updateProduct({
            name:req.body.name,
            category:req.body.category,
            brand:req.body.brand,
            color:req.body.color,
            quantity:req.body.quantity,
            sold:req.body.sold,
            regularPrice:Number(req.body.regularPrice),
            price:Number(req.body.price),
            description:req.body.description,
            image:req.body.image,
            ratings:req.body.ratings
        },req.params.id)
            SuccessResponse.message="Product updated Successfully";
            SuccessResponse.data=response;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function reviewProduct(req,res){
    try {
        //console.log(req.user);
        const response=await ProductService.reviewProduct({
            name:req.user.name,
            star:req.body.star,
            ratings:req.body.ratings,
            ratingDate:req.body.ratingDate,
            userId:req.user._id
        },req.params.id)
            SuccessResponse.message="Product review added Successfully";
            SuccessResponse.data=response;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function deleteReview(req,res){
    try {
        //console.log(req.user);
        const response=await ProductService.deleteReview(req.body.userID,req.user._id,req.params.id)
            SuccessResponse.message="Product review deleted Successfully";
            SuccessResponse.data=response;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function updateReview(req,res){
    try {
        const response=await ProductService.updateReview({
            star:req.body.star,
            ratings:req.body.ratings,
            ratingDate:req.body.ratingDate,
            userID:req.body.userID,
            userId:req.user._id,
            name:req.user.name
        },req.params.id)
            SuccessResponse.message="Product review updated Successfully";
            SuccessResponse.data=response;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}
module.exports={
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    reviewProduct,
    deleteReview,
    updateReview
}