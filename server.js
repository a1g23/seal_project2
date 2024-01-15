// import dependencies

require("dotenv").config()

const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const mongoConnection = require("./controllers/db")
const Apparel = require("./models/Apparel")

// get dotenv variable

const SECRET = process.env.SECRET


// create app

const app = express()

// register middleware
app.use(morgan("dev")) // the string dev is the type of logs that morgan will send (in documentation)
app.use(methodOverride("_method")) // allow for put and delete requests
app.use(express.urlencoded({extended: true})) // parse url encoded bodys (forms that we can look reqs)
app.use(express.static("public"))

// ALL MY ROUTES //

// simple get route to test
app.get ("/", (req, res) => {
    res.send("server looks goodie")
})

// seed route
app.get("/mycloset/seed", async (req, res) => {
    try {
        // array of starter apparel
        const starterApparel = [
            {
              type: "T-shirt",
              brand: "Adidas",
              size: "M",
              nickname: "The Comfy One"
            },
            {
              type: "Jeans",
              brand: "Levi's",
              size: "W32 L32",
              nickname: "The Classics"
            },
            {
              type: "Hoodie",
              brand: "Nike",
              size: "L",
              nickname: "Cozy Nights"
            },
            {
              type: "Chinos",
              brand: "Banana Republic",
              size: "32",
              nickname: "Weekend Warriors"
            },
            {
              type: "Dress Shirt",
              brand: "Calvin Klein",
              size: "16",
              nickname: "Sharp Shooter"
            }
          ]
        // delete all Apparel
        await Apparel.deleteMany({})

        // add the starter apparel
        const seedApparel = await Apparel.create(starterApparel)

        //respose
        res.json(seedApparel)


    } catch (error) {
        res.send("There was an Error")
        console.log(error.message)
    }
})


// Index Route

app.get("/mycloset", async (req, res) => {
    try {
        // get the apparel from the db
        const apparel = await Apparel.find({})

        // render to index.ejs and send the apparel
        res.render("index.ejs", {apparel})

    } catch (error) {
        res.send("There was an Error")
        console.log(error.message)
    }
})

// New Route

app.get("/mycloset/new", (req, res) => {
  // render the new.ejs form (no db request)
  res.render("new.ejs")
})

// Create Route

app.post("/mycloset", async (req, res) => {
    try {
        // grab the body from the form
        const newApparel = req.body
        // create the newApparel in db
        await Apparel.create(newApparel)
        // redirect to the index.ejs
        res.redirect("/mycloset")
      
    } catch (error) {
      res.send("There was an Error")
      console.log(error.message)
    }
})

// Show Route

app.get("/mycloset/:id", async (req, res) => {
    try {
        // get the id from the params
        const id = req.params.id

        // find the apparel from the db
        const indyApparel = await Apparel.findById(id)

        // render to show.ejs and send the indyApparel
        res.render("show.ejs", {indyApparel})

    } catch (error) {
    res.send("There was an Error")
    console.log(error.message)
}
})


// app listener
const PORT = process.env.PORT
app.listen(PORT, () => {console.log(`listening on ${PORT}`)})
