// import dependencies
const express = require("express")
const User = require("../models/User")
const bcrypt = require("bcrypt")

// create the router

const router = express.Router()

// Routes

// New Route (SignUp Route)

router.get("/signup", (req, res) => {
    // render the sign up page
    res.render("user/signup.ejs")
})





// export the user router

module.exports = router
