// import dependencies
const express = require("express")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const { findOne } = require("../models/Apparel")

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

// Submit Login request
router.post("/login", async (req, res) => {
    try {
    // get the username and password from the body
    const username = req.body.username
    const password = req.body.password

    // find the username in the db
    const user = await User.findOne({username})
    
    // check for user, throw error if not found
    if (!user) {
        throw new Error("User Not Found")
    }
    // password verification
    const passwordResult = await bcrypt.compare(password, user.password)

    // throw error if passwordResult is false
    if (!passwordResult) {
        throw new Error("Password Incorrect")
    }

    // save the session
    req.session.username = username
    req.session.loggedIn = true

    // redirect to index
    res.redirect("/mycloset")

    } catch (error) {
    res.send("There was an Error")
    console.log(error.message)
    }
})

// Logout Route
router.get("/logout", async (req, res) => {
    await req.session.destroy((err) => {
        res.redirect("/user/login")
    })
})

// export the user router

module.exports = router
