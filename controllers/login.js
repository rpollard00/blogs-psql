const jwt = require("jsonwebtoken")
const router = require("express").Router()

const { SECRET } = require("../util/config")
const User = require("../models/user")
const { response } = require("express")

router.post("/", async (req, res) => {
  const body = req.body
  // find user in db that matches submitted username
  const user = await User.findOne({
    where: {
      username: body.username,
    },
  })

  // validate that a correct password is given (we are using dummy secret password here)
  const passwordCorrect = body.password === "secret"

  // return 401 if either user or password check fails
  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "Invalid username or password",
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  // use jwt to generate a signed token
  const token = jwt.sign(userForToken, SECRET)

  // return the token, username, and name
  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router
