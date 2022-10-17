const router = require("express").Router()
//const jwt = require("jsonwebtoken")

const { UserBlogs } = require("../models")

//const { Op } = require("sequelize")

//const { SECRET } = require("../util/config")
//const { sequelize } = require("../util/db")

router.post("/", async (req, res, next) => {
  try {
    // add a blog to a reading list, give userId and blogId
    console.log(req.body)
    const listEntry = await UserBlogs.create({ ...req.body, read: false })
    res.json(listEntry)
  } catch (error) {
    next(error)
  }
})

module.exports = router

// router.post("/", tokenExtractor, async (req, res, next) => {
//   try {
//     console.log(req.body)
//     const user = await User.findByPk(req.decodedToken.id)
//     console.log(user)
//     const blog = await Blog.create({
//       ...req.body,
//       userId: user.id,
//       year: new Date().getYear() + 1900,
//     })
//     res.json(blog)
//   } catch (error) {
//     next(error)
//   }
// })
