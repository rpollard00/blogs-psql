const { response } = require("express")

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  console.error("ERROR NAME:", error.name)

  if (error.name === "SequelizeValidationError") {
    return res.status(400).send({
      error:
        "Unable to validate request body. Check for missing non-nullable fields.",
    })
  }

  // typeError probably a 404 due to a null value i.e. doesn't exist
  if (error.name === "TypeError") {
    return res.status(404).end()
  }

  if (error.name === "SyntaxError") {
    return res.status(400).send({
      error: "Syntax error. Check JSON body for trailing commas",
    })
  }

  next(error)
}

module.exports = errorHandler
