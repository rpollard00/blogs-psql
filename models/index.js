const Blog = require("./blog")
const User = require("./user")
const UserBlogs = require("./user_blogs")

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: UserBlogs, as: "reading_list" })
Blog.belongsToMany(User, { through: UserBlogs, as: "listed_blogs" })

// Blog.sync({ alter: true })
// User.sync({ alter: true })

module.exports = {
  Blog,
  User,
  UserBlogs,
}
