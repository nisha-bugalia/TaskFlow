const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect("mongodb+srv://pawankumarverma:123pawanKUMAR@cluster0.zstly.mongodb.net/ProFlow?retryWrites=true&w=majority&appName=Cluster0",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log(`Connected to the MongoDB Successfully:${conn.connection.host}`);
    }catch(err){
        console.log(`Error:${err.message}`);
        process.exit(1);
    }
};
module.exports= connectDB;