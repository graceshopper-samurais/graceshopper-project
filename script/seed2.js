'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      name: 'cody',
      address: '145 Main Street',
      city: 'Chicago',
      state: 'IL',
      zip: '60080'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      name: 'Murphy',
      address: '145 Main Street',
      city: 'Chicago',
      state: 'IL',
      zip: '60080'
    })
  ])

  const [userOne, userTwo] = users

  const products = await Promise.all([
    Product.create({
      name: 'Fancy Candle',
      description: 'Pink glittery slow-burning candle with three wicks',
      imageUrl: 'https://fimgs.net/himg/o.88372.jpg',
      price: 75
    }),
    Product.create({
      name: 'Ocean Breeze',
      description: 'Sea salt and ocean spray to make your day',
      imageUrl: 'https://fimgs.net/himg/o.88372.jpg',
      price: 62
    })
    // User.create({email: 'murphy@email.com', password: '123'}),
  ])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)

  const [productOne, productTwo] = products

  await userOne.addProduct(productOne)
  await userTwo.addProduct(productTwo)
  await userOne.addProduct(productTwo)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
