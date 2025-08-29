const pattern = /^(https?:\/\/)[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

const validateItem = (data) => {
  try {
    const { name, description, category,coverImage, additionalImages, price } = data;

    // Name validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      throw new Error("Name is required");
    }

    // Description validation
    if (!description || typeof description !== "string" || description.trim() === "") {
      throw new Error("Description is required");
    }

    // Cover image validation
    if (!coverImage || typeof coverImage !== "string" || !pattern.test(coverImage)) {
      throw new Error("Cover image is required and must be a valid URL");
    }

    // Additional images validation
    if (!Array.isArray(additionalImages)) {
      throw new Error("Additional images must be an array.");
    } else {
      additionalImages.forEach((img, index) => {
        if (typeof img !== "string" || !pattern.test(img)) {
          throw new Error(`Additional image at index ${index} must be a valid URL.`);
        }
      });
    }

    // Price validation
    if (!Array.isArray(price) || price.length === 0) {
      throw new Error("Price must be a non-empty array");
    } else {
      price.forEach((p, index) => {
        if (!p.unit || typeof p.unit !== "string" || p.unit.trim() === "") {
          throw new Error(`Price at index ${index} must have a valid unit`);
        }
        if (typeof p.price !== "number" || p.price <= 0) {
          throw new Error(`Price at index ${index} must be a positive number`);
        }
      });
    }

    // Filtered and validated data
    const filteredData = {
      name: name.trim(),
      description: description.trim(),
      coverImage: coverImage.trim(),
      additionalImages: additionalImages.map((img) => img.trim()),
      price, // already validated array of { unit, price }
      category
    };

    return filteredData;
  } catch (error) {
    console.error("Validation error:", error.message);
    throw error;
  }
};

module.exports = validateItem;
