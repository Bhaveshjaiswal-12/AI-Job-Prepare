const mongoose = require("mongoose")

async function conncetTODB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database is connect succesfully")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = conncetTODB 