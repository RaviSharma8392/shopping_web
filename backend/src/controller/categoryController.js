const Category = require('../schema/category'); 

// ✅ Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error("Get Categories Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// ✅ Create category
exports.createCategory = async (req, res) => {
  try {
    const { name, description, image, isActive, subcategories } = req.body;

    // Check duplicate
    const exists = await Category.findOne({ name: name.trim() });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }

    // Create category with subcategories
    const category = await Category.create({
      name: name.trim(),
      description,
      image,
      isActive: isActive !== undefined ? isActive : true,
      subcategories: subcategories || [], // ✅ add subcategories here
    });

    res.status(201).json({ success: true, category });
  } catch (error) {
    console.error("Category Create Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};


// ✅ Update category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image, isActive, subcategories } = req.body;

    const updated = await Category.findByIdAndUpdate(
      id,
      {
        name: name?.trim(),
        description,
        image,
        isActive,
        subcategories: subcategories || [],
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, category: updated });
  } catch (error) {
    console.error("Category Update Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// ✅ Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Category Delete Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

exports.getAllCategoriesWithSub = async (req, res) => {

  try {
    const categories = await Category.find({});
    res.status(200).json({ success: true, categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Category ID is required" });
    }

    const category = await Category.findById(id).populate("subcategories"); // if subcategories are referenced

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};