 const pattern = /^(https?:\/\/)[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

const validateItem = (data) => {
  try {
    const { name, type, description, coverImage, additionalImages } = data;
    if (!name || typeof name !== "string" || name.trim() === "") {
      throw new Error("Name is required");
    }

    if (!type || typeof type !== "string" || type.trim() === "") {
      console.log("Type is required")
      throw new Error("Type is required");
    }

    if (
      !description ||
      typeof description !== "string" ||
      description.trim() === ""
    ) {
      throw new Error("Description is required ");
    }

    if (
      !coverImage ||
      typeof coverImage !== "string" ||
      coverImage.trim() === ""|| !pattern.test(coverImage)

    ) 
    {      console.log(pattern.test(coverImage))

      throw new Error(
        "Cover image is required and must be correct url"
      );
    }

    if (!Array.isArray(additionalImages)) {
      throw new Error("Additional images must be an array.");
    } else {
      additionalImages.forEach((img, index) => {
        if (typeof img !== "string") {
          throw new Error(`Additional image must be a valid URL.`);
        }
      });
    }
    const filterdata = {
      name,
      type,
      description,
      coverImage,
      additionalImages,
    };

    return filterdata;
  } catch (error) {
    console.log(error);
console.log(error)
  throw error;  
}
};
module.exports = validateItem;
