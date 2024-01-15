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

// Create Route (Create User in db)

router.post("/signup", async (req, res) => {
    try {
    // get the new user with body
    const newUser = req.body
    // encrypt the password
    newUser.password = await bcrypt.hash(
        newUser.password, 
        await bcrypt.genSalt(8))
    
    // create the newUser
    await User.create(newUser)

    // redirect to the login page
    res.redirect("/user/login")

    } catch(error) {
    res.send("There was an Error")
    console.log(error.message)
    }
})

// Login Page Route
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})



// export the user router

module.exports = router
