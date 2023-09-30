const {StatusCodes}=require('http-status-codes')
const AppError=require('../utils/error/app-error');
const Category = require('../models/categoryModel');
const slugify =require('slugify')

async function createCategory(userData){
    try {
        const {name}=userData;
        
        if(!name){
            throw new AppError('Category name is missing', StatusCodes.BAD_REQUEST)
        }
        const categoryExist= await Category.findOne({name});
        if(categoryExist) throw new AppError('Category name already exists', StatusCodes.BAD_REQUEST)
        const category=await Category.create({name,slug:slugify(name)})
        return category;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Unable to create the Category: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}

async function getCategory(){
    try {
        const category=await Category.find().sort('-createdAt');
        return category;
    } catch (error) {
        //console.log(error);
        throw new AppError('Unable to get all the Category: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}


async function deleteCategory(slug){
    try {
        const category=await Category.findOneAndDelete({slug});
        if(!category)throw new AppError('Unable to find or doesn\'t exists the Category', StatusCodes.NOT_FOUND)
        return category;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Unable to delete the Category: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}
module.exports={
    createCategory,
    getCategory,
    deleteCategory
}
