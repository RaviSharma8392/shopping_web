const express = require("express");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategoriesWithSub,
  getCategoryById,
} = require("../../controller/categoryController");

const category_router = express.Router();

// Public or protected (you can add auth middleware if needed)
category_router.get("/", getCategories);
category_router.post("/", createCategory);

category_router.get("/all", getAllCategoriesWithSub);
category_router.get("/:id", getCategoryById);

category_router.put("/:id", updateCategory);
category_router.delete("/:id", deleteCategory);


module.exports = category_router;
