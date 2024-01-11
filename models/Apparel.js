//import connection
const mongoose = require("mongoose")

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