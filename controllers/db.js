// import dependencies

require("dotenv").config()
const mongoose = require("mongoose")

// database connection

const DATABASE_URL = process.env.DATABASE_URL
mongoose.connect(DATABASE_URL)

mongoose.connection.on("open", () => console.log("connected to mongo"))
mongoose.connection.on("close", () => console.log("disconnected to mongo"))
mongoose.connection.on("error", (error) => console.log(error.message))

// export connection
module.exports = mongoose