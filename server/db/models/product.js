const Sequelize = require('sequelize')
const db = require('../db')

// const User = db.define('user', {
//   name: {

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: '/images/default.jpg'
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Product
