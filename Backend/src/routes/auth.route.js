const {Router} = require("express")
const authcontroller = require("../controller/auth.controller")
const authMiddleware = require("../Middlewares/auth.middleware")


const authRouter = Router()
/**
 * @routes POST /api/auth/register
 * @description Register a new user
 * @access Public 
 */
authRouter.post("/register",authcontroller.registerUsercontroller)

/**
 * @routes POST /api/auth/login
 * @description login user with email and password
 * @access public 
 */

authRouter.post("/login",authcontroller.loginUsercontroller)

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */

authRouter.get("/logout",authcontroller.logoutUSerController)

/**
 * @route GET /api/auth/get-me
 * @description Get the current logged in user details
 * @access private  
 */

authRouter.get("/get-me",authMiddleware.authUser,authcontroller.getMeController)

module.exports = authRouter