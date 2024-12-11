const mongoose = require("mongoose")
require("dotenv").config()

const mongoString = process.env.MONGODB

// this is syntax to connect to the database..

const initializeDatabase = () => {
    mongoose
    .connect(mongoString)
    .then(() => {
        console.log("Database connected successfully.")
    })
    .catch((error) => {
        console.log("Error to connecting the database.", error)
    })

}

module.exports = { initializeDatabase }


