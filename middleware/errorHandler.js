const { response } = require("express")

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  console.error("ERROR NAME:", error.name)
  console.error("ERROR FULL", error)

  if (error.name === "SequelizeValidationError") {
    const errorTypeName = error.errors[0].validatorName

    if (errorTypeName === "isEmail") {
      return res.status(400).send({
        error: "Unable to create user. Username must be a valid email address.",
      })
    }

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
