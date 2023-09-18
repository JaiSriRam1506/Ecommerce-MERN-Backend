const mongoose=require('mongoose');
const brandSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please add a brand name'],
        trim:true,
        unique:true,
        minlength:[2,'Too Short'],
        maxlength:[32,'Too Long']
        
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        index:true
    },
    category:{
        type:String,
        required:[true, 'Please add a category name'],
        trim:true,
    }
},
{
    timestamps:true
}
);
const Brand=mongoose.model('Brand',brandSchema);
module.exports=Brand;