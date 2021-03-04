const User = require('./user')
const Product = require('./product')
const ProductOrder = require('./productorder')
const Order = require('./order')

User.belongsToMany(Product, {through: ProductOrder})
Product.belongsToMany(User, {through: Cart})

User.hasOne(Cart)
Cart.belongsTo(User)
Product.hasMany(Cart)
Cart.belongsTo(Product)

module.exports = {
  User,
  Product,
  Order,
  ProductOrder
}
