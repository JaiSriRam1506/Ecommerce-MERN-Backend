const mongoose=require('mongoose');
const { ObjectId }=mongoose.Schema;
const bcrypt = require('bcrypt');
const {ServerConfig}=require('../config')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please add a Name']
    },
    email: {
        type: String,
        required: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid emaial",
        ],
      },
      password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be up to 6 characters"],
        //   maxLength: [23, "Password must not be more than 23 characters"],
      },
      role: {
        type: String,
        required: [true],
        default: "customer",
        enum: ["customer", "admin"],
      },
      photo: {
        type: String,
        required: [true, "Please add a photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png",
      },
      phone: {
        type: String,
        default: "+234",
      },
      address: {
        type: Object,
        address:String,
        state:String,
        country:String
        // address, state, country
      },
      cartItems:{
        type:[Object]
      }
},
{
  timestamps:true
});

userSchema.pre("save",async function (next){
        if(!this.isModified('password'))return next();

        //Hash the Password
        const encryptPassword=await bcrypt.hashSync(this.password,+ServerConfig.SALT_ROUNDS);
        this.password=encryptPassword;
        next();
})
const User=mongoose.model('User',userSchema);
module.exports=User;