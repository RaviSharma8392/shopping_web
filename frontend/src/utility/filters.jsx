// This utility file contains reusable filtering logic
export const filterBySubcategory = (products, subcategoryId) => {
  if (subcategoryId === "all") return products;
  return products.filter(
    (p) => p.subcategory && p.subcategory._id === subcategoryId
  );
};

export const filterByPrice = (products, [min, max]) => {
  return products.filter((p) => {
    const price = p.price?.[0]?.price;
    return price !== undefined && price >= min && price <= max;
  });
};

export const filterByRating = (products, minRating) => {
  if (minRating === 0) return products;
  return products.filter((p) => p.rating >= minRating);
};
