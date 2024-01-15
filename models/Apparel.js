//import connection
const mongoose = require("../controllers/db")


// 
const Schema = mongoose.Schema
const model = mongoose.model

//create Schema
const apparelSchema = new mongoose.Schema( {
    type: String,
    brand: String,
    size: String,
    nickname: String,
})

// creat the model User

const Apparel = model("Apparel", apparelSchema)

// export the User

module.exports = Apparel