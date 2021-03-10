const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('productorder', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  subtotal: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  updatedAt: {
    type: Sequelize.DATEONLY
  }
})

module.exports = ProductOrder
