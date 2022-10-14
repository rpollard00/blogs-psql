const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")

class User extends Model {}

User.init(
  {
    // id
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // username
    // name
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "user",
  }
)

module.exports = User
