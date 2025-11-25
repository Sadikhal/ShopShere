export const mockProduct = {
  id: 1,
  title: "Test Sneaker",
  price: 100,
  thumbnail: "sneaker.jpg",
  description: "Running shoe",
  discountPercentage: 10,
  rating: 4.5,
  stock: 10,
  brand: "Nike",
  category: "shoes",
  images: ["sneaker.jpg"],
  colors: ["Red", "Blue"],
  sizes: ["10"],
};

export const mockProductsList = [
  {
    ...mockProduct,
    id: 1,
    title: "Test Smartphone",
    category: "smartphones",
    price: 599,
  },
  {
    ...mockProduct,
    id: 2,
    title: "Test Laptop",
    category: "laptops",
    price: 999,
  },
];

export const mockCategories = ["smartphones", "laptops", "fragrances"];
