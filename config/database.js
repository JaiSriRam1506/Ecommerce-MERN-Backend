const mongoose=require('mongoose')
const {MONGO_URI}=require('./server-config')

const connectDatabase = async () => {
  try {
    //await mongoose.set('strictQuery', false);
    const res=await mongoose
                            .set('strictQuery', false)
                            .connect(MONGO_URI,{
                              useNewUrlParser: true,
                              useUnifiedTopology: true,
                            })
    console.log('MongoDB Connected...');    
  } catch (error) {
    console.error(error.message);
        // make the process fail
        process.exit(1);
  }
};

module.exports={
  connectDatabase
}
