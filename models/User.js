//import connection
const mongoose = require("mongoose")

//create Schema
const userSchema = new mongoose.Schema( {
    username: {required: true, String, unique: true},
    password: {required: true, String}
})

// creat the model User

const User = model("User", userSchema)

// export the User

module.exports = User

