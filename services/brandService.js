const {StatusCodes}=require('http-status-codes')
const AppError=require('../utils/error/app-error');
const Brand = require('../models/brandModel')
const slugify =require('slugify');
const Category = require('../models/categoryModel');

async function createBrand(userData){
    try {
        const {name,category}=userData;
        
        if(!name || !category){
            throw new AppError('Brand Name or Category is missing', StatusCodes.BAD_REQUEST)
        }

        const categoryExists=await Category.findOne({name:category});
        if(!categoryExists)throw new AppError('Unable to find or doesn\'t exists the Category', StatusCodes.NOT_FOUND);

        const brandExist= await Brand.findOne({name});
        if(brandExist) throw new AppError('Brand name already exists', StatusCodes.BAD_REQUEST)

        const brand=await Brand.create({name,slug:slugify(name),category})
        return brand;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Unable to create the Brand: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}

async function getBrand(){
    try {
        const brand=await Brand.find().sort('-createdAt');
        return brand;
    } catch (error) {
        throw new AppError('Unable to get all the Brand: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}


async function deleteBrand(slug){
    try {
        const brand=await Brand.findOneAndDelete({slug});
        if(!brand)throw new AppError('Unable to find or doesn\'t exists the Brand', StatusCodes.NOT_FOUND)
        return brand;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Unable to delete Brand: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}
module.exports={
    createBrand,
    getBrand,
    deleteBrand
}
