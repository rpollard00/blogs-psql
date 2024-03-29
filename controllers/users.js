const router = require("express").Router()

const { User, Blog } = require("../models")

const { Op } = require("sequelize")

// GET (list all users)
router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attribtues: { exclude: ["userId"] },
    },
  })
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

router.get("/:id", async (req, res, next) => {
  try {
    let where = {}

    if (req.query.read) {
      where = {
        read: {
          [Op.is]: Boolean(req.query.read === "true"),
        },
      }
    }
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Blog,
        },
        {
          model: Blog,
          as: "reading_list",
          attributes: ["title", "id"],
          through: {
            attributes: ["read", "id"],
            where,
          },
        },
      ],
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router
