const router = require("express").Router()

const { User } = require("../models")

// GET (list all users)
router.get("/", async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

// POST (add user)
router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// PUT :username (update username)
router.put("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
