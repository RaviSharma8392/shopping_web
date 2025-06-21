const  express = require('express')
const item_router = require('./v1/item-route/items')
const router = express.Router()

router.use("/v1",item_router)

module.exports=router