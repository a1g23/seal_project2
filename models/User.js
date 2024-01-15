//import connection
const mongoose = require("../controllers/db")

const Schema = mongoose.Schema
const model = mongoose.model

//create Schema
const userSchema = new Schema ({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
    
})

// creat the model User

const User = model("User", userSchema)

// export the User

module.exports = User

