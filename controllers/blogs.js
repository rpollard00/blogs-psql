const router = require("express").Router()

const { Blog } = require("../models")

// get api/blogs
router.get("/", async (req, res) => {
  // findAll
  const blogs = await Blog.findAll()
  console.log(JSON.stringify(blogs, null, 2))
  // response
  res.json(blogs)
})

// post api/blogs
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body)
    const blog = await Blog.create(req.body)
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
router.delete("/:id", blogFinder, async (req, res, next) => {
  try {
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
