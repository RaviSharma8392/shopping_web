const express = require('express');
const { createItem, getItems, getItemsByID, sendEmailUser, getItemsByCategory, bestSellers } = require('../../controller/item-controller');
const item_router = express.Router();

item_router.get("/items", getItems);
item_router.post("/add", createItem);

// Specific routes first
item_router.get("/best-sellers", bestSellers);
item_router.get("/category/:category", getItemsByCategory);

// Dynamic ID route last
item_router.get("/:id", getItemsByID);

// Orders
item_router.post("/email/:id", sendEmailUser);

module.exports = item_router;
