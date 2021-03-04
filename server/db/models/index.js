const User = require('./user')
const Product = require('./product')
const ProductOrder = require('./productorder')
const Order = require('./order')

User.hasMany(Order)
Order.belongsTo(User)

// super many-to-many
Product.belongsToMany(Order, {through: ProductOrder})
Order.belongsToMany(Product, {through: ProductOrder})
Product.hasMany(ProductOrder)
ProductOrder.belongsTo(Product)
Order.hasMany(ProductOrder)
ProductOrder.belongsTo(Order)

module.exports = {
  User,
  Product,
  Order,
  ProductOrder
}
