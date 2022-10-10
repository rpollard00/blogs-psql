require("dotenv").config()
const { Sequelize, Model, DataTypes } = require("sequelize")
const express = require("express")
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL)

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connected successfully initiated.")
    sequelize.close()
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

main()
