const {StatusCodes}=require('http-status-codes')
const AppError=require('../utils/error/app-error');
const Product = require('../models/productModel');
const mongoose=require('mongoose');



async function createProduct(userData){
    try {
        const {name,sku,category,brand,color,quantity,sold,regularPrice,price,description,image,ratings}=userData;
        if(!name || !sku || !category || !brand || !color || !quantity || !regularPrice || !price || !description){
            throw new AppError('Some of the Product field are missing', StatusCodes.BAD_REQUEST)
        }
        const product=await Product.create({
            name,sku,category,brand,color,quantity,sold,regularPrice,price,description,image,ratings
        });
        return product;
    } catch (error) {
        // console.log(error)
        if(error instanceof AppError) throw error;
        throw new AppError('Unable to create the Product: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}

async function getProducts(){
    try {
        const products=await Product.find().sort('-createdAt');
        return products;
    } catch (error) {
        throw new AppError('Unable to get all the Product: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}

async function getProduct(id){
    try {
        const product=await Product.findById(id);
        if(!product)throw new AppError('Unable to find or doesn\'t exists the Product: '+product, StatusCodes.NOT_FOUND)
        return product;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Unable to get single the Product: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}

async function deleteProduct(id){
    try {
        const product=await Product.findByIdAndDelete(id);
        if(!product)throw new AppError('Unable to find or doesn\'t exists the Product: '+product, StatusCodes.NOT_FOUND)
        return product;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Unable to delete the single Product: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}

async function updateProduct(userData,id){
    try {
        const {name,sku,category,brand,color,quantity,sold,regularPrice,price,description,image,ratings}=userData;
        const product=await Product.findById(id);
        if(!product)throw new AppError('Unable to find or doesn\'t exists the Product: '+product, StatusCodes.NOT_FOUND)
        const updatedProduct=await Product.findByIdAndUpdate({_id:id},
        {name,category,brand,color,quantity,sold,regularPrice,price,description,image,ratings},
        {
            new:true,
            runValidators:true
        });
        return updatedProduct;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Unable to Update the single Product: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}

async function reviewProduct(userData,id){
    try {
        const {star,ratings,ratingDate,name,userId}=userData;
        if(star<1 || !ratings)throw new AppError('Please add a star or review of the Product', StatusCodes.BAD_REQUEST)
        const product=await Product.findById(id);
        if(!product)throw new AppError('Unable to find or doesn\'t exists the Product: '+product, StatusCodes.NOT_FOUND)
        const updatedProduct=await product.ratings.push({
        star,ratings,ratingDate,name:name,userID:userId
    });
    product.save();
    return updatedProduct;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Unable to add review of the Product: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}
async function deleteReview(userID,userId,product_id){
    try {
        const product=await Product.findById(product_id);
        if(!product)throw new AppError('Unable to find or doesn\'t exists the Product', StatusCodes.NOT_FOUND)
        console.log("Hello",userID.toString()!==userId.toString(),userID.toString(),userId.toString())
        if(userID.toString()!==userId.toString())throw new AppError('User is not authorized to delete the another\'s review of the Product', StatusCodes.UNAUTHORIZED);
        const newReview=product.ratings.filter((rat)=>{
            return rat.userID.toString()!==userID.toString()
        });
        product.ratings=newReview;
        product.save();
        return newReview;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Unable to delete review of the Product: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}

async function updateReview(userData,id){
    try {
        const {star,ratings,ratingDate,name,userId,userID}=userData;
        if(star<1 || !ratings)throw new AppError('Please add a star or review of the Product', StatusCodes.BAD_REQUEST)
        const product=await Product.findById(id);
        if(!product)throw new AppError('Unable to find or doesn\'t exists the Product', StatusCodes.NOT_FOUND)
        console.log(userID.toString()+"   "+userId.toString())
        if(userID.toString()!==userId.toString())throw new AppError('User is not authorized to update the another\'s review of the Product', StatusCodes.UNAUTHORIZED);
        const updatedReview= await Product.findOneAndUpdate({
            _id:id,
            'ratings.userID':mongoose.Types.ObjectId(userId)
        },
        {
            $set:{
                'ratings.$.star':star,
                'ratings.$.ratings':ratings,
                'ratings.$.ratingDate':ratingDate,
            }
        })
        if(!updateReview)throw new AppError('Unable to Update review of the Product', StatusCodes.INTERNAL_SERVER_ERROR);
        return updatedReview;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Unable to Update review of the Product: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
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