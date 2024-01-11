//import connection
const mongoose = require("mongoose")

//create Schema
const apparelSchema = new mongoose.Schema( {
    title: { required: true, unique: true, String },
    brand: String,
    type: String,
    size: String,
})

// creat the model User

const Apparel = model("Apparel", apparelSchema)

// export the User

module.exports = Apparel