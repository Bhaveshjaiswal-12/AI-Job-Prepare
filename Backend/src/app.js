const express = require("express")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json()) // a middleware that allow Request.body to read data
app.use(cookieParser())

// Require all the routes here
const authRouter = require("./routes/auth.route")


// using all the routes here
app.use("/api/auth",authRouter)

module.exports = app