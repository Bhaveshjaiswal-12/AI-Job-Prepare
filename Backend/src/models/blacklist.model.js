const mongoose = require("mongoose")

const blacklistToken = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required to be added in blacklist"]
    }
},{
    timestamps:true
})

const tokenblacklistModel = mongoose.model("BlacklistToken",blacklistToken)

module.exports = tokenblacklistModel