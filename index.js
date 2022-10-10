require("dotenv").config()
const { Sequelize, QueryTypes, Model, DataTypes } = require("sequelize")
const express = require("express")
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL)

const main = async () => {
  try {
    await sequelize.authenticate()
    const blogs = await sequelize.query("SELECT * FROM blogs", {
      type: QueryTypes.SELECT,
    })
    blogs.map(blog =>
      console.log(`${blog.author}: '${blog.title}' ${blog.likes} likes`)
    )
    console.log(blogs)
    sequelize.close()
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

main()
