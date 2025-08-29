const { StatusCodes } = require("http-status-codes");
const validateItem = require("../service/item-validator");
const Item = require("../schema/items");
const { sendEmail } = require('../config/nodemailer-config');
const category = require("../schema/category");

// Create Item
const createItem = async (req, res) => {
  try {
    const data = req.body;

    // Validate incoming data
    const filterData = await validateItem(data);

    // Destructure validated fields
    const { name, category, description, coverImage, additionalImages, price } = filterData;

    // Ensure category is provided
    if (!category) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: "Category is required",
      });
    }

    // Ensure price is an array of objects with positive numbers
    const validPrice = Array.isArray(price)
      ? price.map((p) => ({
          unit: p.unit.trim(),
          price: Number(p.price),
        }))
      : [];

    const newItem = new Item({
      name,
      category, // Make sure category is included
      description,
      coverImage,
      additionalImages: Array.isArray(additionalImages) ? additionalImages : [],
      price: validPrice,
    });

    await newItem.save();

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Item successfully added",
      data: newItem,
    });
  } catch (error) {
    console.error("Error in item controller:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};


// Get all items
const getItems= async (req, res) => {
  try {
    // Fetch all items
    const items = await Item.find()

    // Fetch all categories
    const categories = await category.find();

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully fetched items and categories",
      data: {
        items,
        categories,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Something went wrong",
    });
  }
};


const bestSellers = async (req, res) => {
  try {
    // Only fetch active best sellers
    const bestSellers = await Item.find({ isBestSeller: true, isActive: true });

    console.log("Best Sellers fetched:", bestSellers.length);
    res.status(200).json({ success: true, items: bestSellers });
  } catch (error) {
    console.error("Best Sellers Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};





// Get item by ID
const getItemsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) {
      throw new Error("ID not found");
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully fetched item",
      data: item,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Something went wrong",
    });
  }
};
const getItemsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    // Find items that match the category ID
    const items = await Item.find({ category });

    if (!items.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: "No items found for this category",
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully fetched items by category",
      data: items,
    });
  } catch (error) {
    console.error("Error fetching items by category:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Something went wrong while fetching items",
    });
  }
};


// Send email with item info
const sendEmailUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userEmail=req.body
    console.log(userEmail.email)
    const item = await Item.findById(id);

    if (!item) {
      throw new Error("ID not found");
    }

    const emailres = await sendEmail(item,userEmail,id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: emailres, 
    });
  } catch (error) {
    console.error("Email error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
error:"email is not Valid"  
    });
  }
};

module.exports = {
  createItem,
  getItems,
  getItemsByID,
  sendEmailUser,getItemsByCategory,bestSellers
};
