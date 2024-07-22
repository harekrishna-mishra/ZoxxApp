const mongoose = require("mongoose");

const db = `mongodb+srv://krishmca98:krishmca98@cluster0.sq4pi2b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const connectDB = async ()=>{
    try{
        const res = await mongoose.connect(db)
        console.log("Mongo Connected Successfully")
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB