import React from "react";
import * as ReactTestingLibrary from "@testing-library/react";
import { ProductCard } from "@/components/ProductCard";
import { mockProduct } from "@/__tests__/mocks/data";

const { render, screen } = ReactTestingLibrary as any;

declare const describe: any;
declare const test: any;
declare const expect: any;

describe("ProductCard Unit Tests", () => {
  test("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} />);

    // Title
    expect(screen.getByText("Test Sneaker")).toBeInTheDocument();
    // Price
    expect(screen.getByText("$100")).toBeInTheDocument();
    // Category
    expect(screen.getByText("shoes")).toBeInTheDocument();
    // Rating
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  test("renders discount badge if applicable", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("-10%")).toBeInTheDocument();
    expect(screen.getByText("-10%")).toHaveClass("bg-success");
  });

  test("renders image with correct src", () => {
    render(<ProductCard product={mockProduct} />);

    const img = screen.getByAltText("Test Sneaker");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "sneaker.jpg");
  });

  test("renders color swatches", () => {
    render(<ProductCard product={mockProduct} />);

    // Check if color swatches exist by title attribute
    expect(screen.getByTitle("Red")).toBeInTheDocument();
    expect(screen.getByTitle("Blue")).toBeInTheDocument();
  });

  test("links to correct product page", () => {
    render(<ProductCard product={mockProduct} />);

    // Since we mocked Link as an <a> tag
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/product/1");
  });
});
