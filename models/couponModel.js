const mongoose=require('mongoose')

const couponSchema=mongoose.Schema({
    name:{
        type:String,
        unique:true,
        trim:true,
        uppercase:true,
        minlength:[6,'Coupon must be up to 6 characters'],
        maxlength:[12,'Coupon must not be more than 12 characters'],
        required:[true,'Please add a coupon name']
    },
    expiresAt:{
        //type:Date,
        type:String,
        required:true
    },
    discount:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

const Coupon=mongoose.model('Coupon',couponSchema);
module.exports=Coupon;