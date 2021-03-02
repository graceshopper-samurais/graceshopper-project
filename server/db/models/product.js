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
    defaultValue: 'https://fimgs.net/himg/o.88372.jpg'
  },
  price: {
    type: Sequelize.INTEGER, // how are we handling monies? It seems like the "pennies" approach is common based on some googling
    allowNull: false
  }
})

module.exports = Product
