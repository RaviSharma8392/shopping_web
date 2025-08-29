// This utility file contains reusable sorting functions
export const sortProducts = (products, sortBy) => {
  const sorted = [...products]; // Create a new array

  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price?.[0]?.price - b.price?.[0]?.price);
    case "price-high":
      return sorted.sort((a, b) => b.price?.[0]?.price - a.price?.[0]?.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    case "popularity":
      return sorted.sort((a, b) => b.popularity - a.popularity);
    default:
      return sorted;
  }
};
