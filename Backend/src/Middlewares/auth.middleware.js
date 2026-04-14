const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")
const tokenblacklistModel = require("../models/blacklist.model")

async function authUser(req,res,next){
    const token  = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"token Not provided"
        })
    }

    const istokenBlacklisted = await tokenblacklistModel.findOne({
        token
    })

    if(istokenBlacklisted){
        return res.status(401).json({
            message:"Token is expired."
        })
    }

    try{
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch(err){
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}

module.exports = { authUser}