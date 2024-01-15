// import dependencies

require("dotenv").config()

const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const mongoConnection = require("./controllers/db")
const Apparel = require("./models/Apparel")
const apparelController = require("./controllers/apparel")
const userController = require("./controllers/user")

// get dotenv variable

const SECRET = process.env.SECRET


// create app

const app = express()

// register middleware
app.use(morgan("dev")) // the string dev is the type of logs that morgan will send (in documentation)
app.use(methodOverride("_method")) // allow for put and delete requests
app.use(express.urlencoded({extended: true})) // parse url encoded bodys (forms that we can look reqs)
app.use(express.static("public"))

// register my routes

app.use("/mycloset", apparelController)
app.use("/user", userController)

// app listener
const PORT = process.env.PORT
app.listen(PORT, () => {console.log(`listening on ${PORT}`)})
