import React from "react";
import * as ReactTestingLibrary from "@testing-library/react";
import ProductExplorerClient from "@/components/ProductExplorerClient";
import { fetchProducts } from "@/lib/api";
import { mockProductsList, mockCategories } from "@/__tests__/mocks/data";

const { render, screen, fireEvent, waitFor } = ReactTestingLibrary as any;

declare const describe: any;
declare const test: any;
declare const expect: any;
declare const jest: any;
declare const beforeEach: any;

// Mock API modules
jest.mock("../../lib/api");
const mockFetchProducts = fetchProducts as any;

describe("ProductExplorerFlow Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchProducts.mockResolvedValue({
      products: mockProductsList,
      total: 2,
    });
  });

  test("renders initial products and categories", () => {
    render(
      <ProductExplorerClient
        initialProducts={mockProductsList}
        categories={mockCategories}
      />,
    );

    expect(screen.getByText("Test Smartphone")).toBeInTheDocument();
    expect(screen.getByText("Test Laptop")).toBeInTheDocument();
    expect(screen.getByText("SMARTPHONES")).toBeInTheDocument();
  });

  test("search input triggers client-side API call", async () => {
    render(
      <ProductExplorerClient
        initialProducts={mockProductsList}
        categories={mockCategories}
      />,
    );

    const searchInput = screen.getByPlaceholderText("Search products...");

    // Simulate user typing
    fireEvent.change(searchInput, { target: { value: "Phone" } });

    // Wait for debounce and API call
    await waitFor(
      () => {
        expect(mockFetchProducts).toHaveBeenCalledWith(
          expect.any(Number),
          expect.any(Number),
          "all",
          "Phone",
        );
      },
      { timeout: 1000 },
    );
  });

  test("handles empty results from search", async () => {
    mockFetchProducts.mockResolvedValue({ products: [], total: 0 });

    render(
      <ProductExplorerClient
        initialProducts={mockProductsList}
        categories={mockCategories}
      />,
    );

    const searchInput = screen.getByPlaceholderText("Search products...");
    fireEvent.change(searchInput, { target: { value: "Nonexistent" } });

    await waitFor(() => {
      expect(screen.getByText("No products found.")).toBeInTheDocument();
    });
  });

  test("matches snapshot for product explorer page", () => {
    const { container } = render(
      <ProductExplorerClient
        initialProducts={mockProductsList}
        categories={mockCategories}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
