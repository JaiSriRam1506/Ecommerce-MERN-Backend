const {StatusCodes}=require('http-status-codes')
const {ErrorResponse,SuccessResponse}=require('../utils/common')
const {CategoryService}=require('../services')
const {ServerConfig}=require('../config/index')


async function createCategory(req,res){
    try {
        const response=await CategoryService.createCategory({name:req.body.name})
            SuccessResponse.data=response;
            SuccessResponse.message="Category Created Successfully";
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

async function getCategory(req,res){
    try {
        const response=await CategoryService.getCategory();
            SuccessResponse.data=response;
            SuccessResponse.message="All Category retrieved Successfully";
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

async function deleteCategory(req,res){
    try {
        const response=await CategoryService.deleteCategory(req.params.slug.toLowerCase())
            SuccessResponse.message="Category deleted Successfully";
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
    createCategory,
    getCategory,
    deleteCategory
}