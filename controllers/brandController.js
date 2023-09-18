const {StatusCodes}=require('http-status-codes')
const {ErrorResponse,SuccessResponse}=require('../utils/common')
const {BrandService}=require('../services')
const {ServerConfig}=require('../config/index')


async function createBrand(req,res){
    try {
        const response=await BrandService.createBrand({name:req.body.name,category:req.body.category})
            SuccessResponse.data=response;
            SuccessResponse.message="Brand Created Successfully";
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

async function getBrand(req,res){
    try {
        const response=await BrandService.getBrand();
            SuccessResponse.data=response;
            SuccessResponse.message="All Brand retrieved Successfully";
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

async function deleteBrand(req,res){
    try {
        const response=await BrandService.deleteBrand(req.params.slug.toLowerCase())
            SuccessResponse.message="Brand deleted Successfully";
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
    createBrand,
    getBrand,
    deleteBrand
}