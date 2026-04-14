const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenblacklistModel = require("../models/blacklist.model")
/**
 * @route POST /api/auth/register
 * @description register a new user,expects username, email and
 * password in the request body
 * @access public
 */
async function registerUsercontroller(req,res){
    const {username, email, password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({
            message:"Please provide usename, email, password"
        })
    }

    const isuseralreadyExists = await userModel.findOne({
        $or:[{username},{email}]
    })

    if(isuseralreadyExists){
        return res.status(400).json({
            meassage:"Account is already exits with this email address or username"
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(201).json({
        message:"User Registered succesfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })

} 

/** 
 * @name:loginUsercontroller
 * @description:login a user ,expects email and password in request body
 * @access:public
*/

async function loginUsercontroller(req,res){
    const {email ,password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:" Invalid Email Address or Password"
        })
    }

    const isPasswordvalid = await bcrypt.compare(password,user.password)
    if(!isPasswordvalid){
        return res.status(400).json({
            message:" Invalid Email Address or Password"
        })
    }

    const token = jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)
    res.status(201).json({
        message:"User Loggedin succesfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

/**
 * 
 * @name logoutUserController
 * @description clear token from the cookie and add the token in blacklist
 * @access public 
 */
async function logoutUSerController(req,res){
    const token = req.cookies.token

    if(token){
        await tokenblacklistModel.create({token})
    }

    res.clearCookie("token")
    res.status(200).json({
        message:"User Logged out succesfully"
    })
}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */

async function getMeController(req,res){
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message:"user detail fatched succesfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

module.exports = {
    registerUsercontroller,
    loginUsercontroller,
    logoutUSerController,
    getMeController
}