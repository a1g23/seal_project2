// import dependencies

require("dotenv").config()

const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const apparelController = require("./controllers/apparel")
const userController = require("./controllers/user")
const session = require("express-session")
const MongoStore = require("connect-mongo")

// get dotenv variable

const SECRET = process.env.SECRET


// create app

const app = express()

// register middleware
app.use(morgan("dev")) // the string dev is the type of logs that morgan will send (in documentation)
app.use(methodOverride("_method")) // allow for put and delete requests
app.use(express.urlencoded({extended: true})) // parse url encoded bodys (forms that we can look reqs)
app.use(express.static("public"))
app.use(session({
  secret: process.env.SECRET,
  store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
  saveUninitialized: true,
  resave: false
}))

// register my routes
app.get("/", (req, res) => {
  res.redirect("/mycloset")
})

app.use("/mycloset", apparelController)
app.use("/user", userController)

// app listener
const PORT = process.env.PORT
app.listen(PORT, () => {console.log(`listening on ${PORT}`)})
