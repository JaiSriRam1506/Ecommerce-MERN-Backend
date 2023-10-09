const {StatusCodes}=require('http-status-codes')
const {ErrorResponse,SuccessResponse}=require('../utils/common')
const {PaymentService}=require('../services')
const {ServerConfig}=require('../config/index')

async function payWithStripe(req,res){
    try {
        const { items, shipping, description, coupon } = req.body;
        const response=await PaymentService.payWithStripe({
            items,shipping,description,coupon
        })
            SuccessResponse.data={clientSecret:response};
            SuccessResponse.message="Payment Successful";
            return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message=error.explanation;
        ErrorResponse.error=error;
        ErrorResponse.stack=ServerConfig.NODE_ENV==='development'?error.stack:null;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports={
    payWithStripe
}