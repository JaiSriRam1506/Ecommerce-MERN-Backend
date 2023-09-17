const mongoose=require('mongoose');
const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please add a Name'],
        trim:true
    },
    sku:{
        type:String,
        required:[true,'Please add SKU'],
        default:'SKU',
        trim:true
    },
    category:{
        type:String,
        required:[true,'Please add a category'],
        trim:true
    },
    brand:{
        type:String,
        required:[true,'Please add a brand'],
        trim:true
    },
    color:{
        type:String,
        required:[true,'Please add a color'],
        default:'As seen',
        trim:true
    },
    quantity:{
        type:Number,
        required:[true,'Please add a quantity of the product'],
        trim:true,
    },
    sold:{
        type:Number,
        default:0,
        trim:true
    },
    regularPrice:{
        type:Number,
        trim:true,
        //required:[true,'Please add a regular price']
    },
    price:{
        type:Number,
        trim:true,
        required:[true,'Please add a price']
    },
   description:{
        type:String,
        trim:true,
        required:[true,'Please add a description']
    },
    image:{
        type:[String]
    },
    ratings:{
        type:[Object]
    }
},
{
    timestamps:true
}
);


const Product=mongoose.model('Product',productSchema);
module.exports=Product;