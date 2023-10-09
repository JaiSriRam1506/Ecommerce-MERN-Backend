const mongoose=require('mongoose')

const orderSchema=mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    orderDate:{
        //type:Date,
        type:String,
        required:[true,'Please add order Date'],
        trim:true
    },
    orderTime:{
        //type:Date,
        type:String,
        required:[true,'Please add order Time'],
        trim:true
    },
    orderAmount:{
        type:Number,
        required:[true,'Please add orderAmount'],
        trim:true
    },
    orderStatus:{
        type:String,
        required:[true,'Please add order status'],
        trim:true
    },
    paymentMethod:{
        type:String,
        required:[true,'Please add Payment Mode'],
        trim:true
    },
    cartItems:{
        type:[Object],
        //type:String,
        required:true
    },
    shippingAddress:{
        //type:String,
        type:Object,
        required:true
    },
    billingAddress:{
        //type:String,
        type:Object,
        required:true
    },
    coupon:{
        type:Object,
        required:true,
        default:{
            name:'nil'
        }
    }
},
{
    timestamps:true
});

const Order=mongoose.model('Order',orderSchema);
module.exports=Order;