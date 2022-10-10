require("dotenv").config()
const { Sequelize, QueryTypes, Model, DataTypes } = require("sequelize")
const express = require("express")
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL)
// model of Blog
class Blog extends Model {}
Model.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
)

// get api/blogs
app.get("/api/blogs", async (req, res) => {
  // findAll
  const blogs = await Blog.findAll()
  console.log(JSON.stringify(blogs, null, 2))
  // response
  res.json(blogs)
})

// post api/blogs
app.post("/api/blogs", async (req, res) => {
  try {
    console.log(req.body)
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

// delete api/blogs/:id
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blogToDelete = await Blog.findByPk(req.params.id)
    await blogToDelete.destroy()
    res.status(200).send()
  } catch (error) {
    return res.status(400).json({ error })
  }
})

// server listen on 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// const main = async () => {
//   try {
//     await sequelize.authenticate()
//     const blogs = await sequelize.query("SELECT * FROM blogs", {
//       type: QueryTypes.SELECT,
//     })
//     blogs.map(blog =>
//       console.log(`${blog.author}: '${blog.title}' ${blog.likes} likes`)
//     )
//     console.log(blogs)
//     sequelize.close()
//   } catch (error) {
//     console.error("Unable to connect to the database:", error)
//   }
// }

// main()
