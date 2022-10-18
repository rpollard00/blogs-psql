const { DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("users", "disabled", {
      type: DataTypes.BOOLEAN,
    })
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
    console.log("IS THIS THING")
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumns("users", "disabled")
    await queryInterface.dropTable("sessions")
  },
}
