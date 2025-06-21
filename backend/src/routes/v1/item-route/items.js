const  express = require('express')
const { createItem, getItems, getItemsByID, sendEmailUser, getItemsByType } = require('../../../controller/item-controller/item-controller')
const item_router = express.Router()

item_router.get("/item",getItems)
item_router.post("/item/add",createItem)
item_router.get("/item/:id",getItemsByID)
item_router.get("/item/type/:type",getItemsByType)

item_router.post("/email/:id",sendEmailUser)


module.exports=item_router