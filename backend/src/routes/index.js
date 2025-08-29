const express = require('express')
const category_router = require('./v1/categoryRoutes')
const item_router = require('./v1/items')
const auth_router = require('./v1/auth')
const order_router = require('./v1/order')
const cart_router = require('./v1/cart')


const router = express.Router()

router.use("/v1/order", order_router)
router.use("/v1/item", item_router)
router.use("/v1/auth", auth_router)
router.use("/v1/category", category_router)
router.use("/v1/cart", cart_router)


module.exports = router
