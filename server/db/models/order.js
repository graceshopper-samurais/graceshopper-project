const Sequelize = require('sequelize')
const db = require('../db')
const moment = require('moment')

const Order = db.define('order', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  isFulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  updatedAt: {
    type: Sequelize.DATEONLY
    // get() {
    //   return moment(this.getDataValue('updatedAt')).format('DD.MM.YYYY')
    // },
  }
})

module.exports = Order
