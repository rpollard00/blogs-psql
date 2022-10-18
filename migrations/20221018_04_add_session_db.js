const { DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("sessions", {
      sid: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      expires: {
        type: DataTypes.DATE,
      },
      data: {
        type: DataTypes.STRING(50000),
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("sessions")
  },
}
