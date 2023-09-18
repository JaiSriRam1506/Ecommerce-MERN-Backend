const mongoose=require('mongoose');
const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please add a category name'],
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
},
{
    timestamps:true
}
);
const Category=mongoose.model('Category',categorySchema);
module.exports=Category;