const router = require("express").Router()

const { Blog, User } = require("../models")

const { Op } = require("sequelize")
const { sequelize } = require("../util/db")

/**
 * Returns the number of blogs for each author
 * and the total number of likes for each author
 *
 * res = {
 *  author:
 *  articles:
 *  likes:
 * }
 */
router.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
      [sequelize.fn("COUNT", sequelize.col("title")), "titles"],
    ],
    group: "author",
    order: sequelize.literal("likes DESC"),
  })

  console.log(JSON.stringify(authors, null, 2))
  res.json(authors)
})

module.exports = router
