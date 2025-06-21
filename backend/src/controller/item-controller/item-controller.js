const { StatusCodes } = require("http-status-codes");
const validateItem = require("../../service/item-validator");
const Item = require("../../schema/items");
const { sendEmail } = require('../../config/nodemailer-config');

// Create Item
const createItem = async (req, res) => {
  try {
    const data = req.body;
    
    const filterData = await validateItem(data);

    const { name, type, description, coverImage, additionalImages } = filterData;
    const newItem = new Item({ name, type, description, coverImage, additionalImages });

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
const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully fetched items",
      data: items,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Something went wrong",
    });
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
const getItemsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const items = await Item.find({ type });
    // console.log(items)
    console.log("called in getItemsByType")
    console.log(type)

    if (!items.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: "No items found for this type",
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully fetched items by type",
      data: items,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Something went wrong",
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
  sendEmailUser,getItemsByType
};
