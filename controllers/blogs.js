const router = require("express").Router()
const jwt = require("jsonwebtoken")

const { Blog, User } = require("../models")

const { Op } = require("sequelize")

const { SECRET } = require("../util/config")
const { sequelize } = require("../util/db")

// get api/blogs
router.get("/", async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.substring]: req.query.search,
          },
        },
        {
          author: {
            [Op.substring]: req.query.search,
          },
        },
      ],
    }
  }
  // findAll
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
    order: sequelize.literal("likes DESC"),
  })
  console.log(JSON.stringify(blogs, null, 2))
  // response
  res.json(blogs)
})

// middleware for extracting token from request
const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization")

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({
        error: "token invalid",
      })
    }
  } else {
    return res.status(401).json({ error: "token missing" })
  }

  next()
}

// post api/blogs
router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    console.log(req.body)
    const user = await User.findByPk(req.decodedToken.id)
    console.log(user)
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    })
    res.json(blog)
  } catch (error) {
    next(error)
  }
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

// delete api/blogs/:id
router.delete("/:id", blogFinder, tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)

    if (user.id !== req.blog.userId) {
      return res
        .status(401)
        .json({ error: "Not authorized to delete blog entry" })
    }

    await req.blog.destroy()
    res.status(200).send()
  } catch (error) {
    next(error)
  }
})

router.put("/:id", blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = Number(req.blog.likes) + Number(req.body.likes)
    await req.blog.save()
    res.json(req.blog)
  } catch (error) {
    next(error)
  }
  // if (req.blog) {
  //   req.blog.likes = Number(req.blog.likes) + 1
  //   await req.blog.save()
  //   res.json({ likes: req.blog.likes })
  // } else {
  //   res.status(404).end()
  // }
})

module.exports = router
