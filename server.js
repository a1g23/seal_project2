// import dependencies

require("dotenv").config()

const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")

// get dotenv variable

const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT
const SECRET = process.env.SECRET

// database connection

mongoose.connect(DATABASE_URL)

mongoose.connection.on("open", () => console.log("connected to mongo"))
mongoose.connection.on("close", () => console.log("disconnected to mongo"))
mongoose.connection.on("error", (error) => console.log(error.message))


// create app

const app = express()


// simple get route to test
app.get ("/", (req, res) => {
    res.send("server looks goodie")
})


// app listener
app.listen(PORT, () => {console.log(`listening on ${PORT}`)})
