const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')

User.belongsToMany(Product, {through: Cart})
Product.belongsToMany(User, {through: Cart})

User.hasOne(Cart)
Cart.belongsTo(User)
Product.hasMany(Cart)
Cart.belongsTo(Product)

module.exports = {
  User,
  Product,
  Cart
}
