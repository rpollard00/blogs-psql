const router = require("express").Router()
//const jwt = require("jsonwebtoken")

const { UserBlogs, Blog, User } = require("../models")
const { tokenExtractor } = require("../util/middleware")

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

router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    // get readingList entry based on id param
    const entryToMark = await UserBlogs.findByPk(req.params.id)

    // get user with readingList entries
    const user = await User.findByPk(req.decodedToken.id, {
      include: [
        {
          model: Blog,
          as: "reading_list",
          attributes: ["id"],
          through: {
            attributes: ["blogId", "read"],
          },
        },
      ],
    })

    // list of blogIds in users reading list
    const readingList = user.reading_list.map(blog => blog.user_blogs.blogId)

    //  is the blogId of the given user_blogs(readingList) entry in the users reading list
    const blogInReadingList = readingList.includes(entryToMark.blogId)

    if (!blogInReadingList) {
      res.status(400).send()
    }

    // update the readingList entry in the db and return that as the result
    entryToMark.read = Boolean(req.body.read)
    await entryToMark.save()
    res.json(entryToMark)
  } catch (error) {
    next(error)
  }
})

module.exports = router
