// import dependencies

require("dotenv").config()

const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const mongoConnection = require("./controllers/db")

// get dotenv variable

const SECRET = process.env.SECRET


// create app

const app = express()


// simple get route to test
app.get ("/", (req, res) => {
    res.send("server looks goodie")
})





// app listener
const PORT = process.env.PORT
app.listen(PORT, () => {console.log(`listening on ${PORT}`)})
