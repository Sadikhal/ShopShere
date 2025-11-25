import * as ReactTestingLibrary from "@testing-library/react";
import ProductDetailClient from "@/components/ProductDetailClient";
import { useCartStore } from "@/lib/store";
import { ToastProvider } from "@/components/ui";
import { mockProduct } from "@/__tests__/mocks/data";

const { render, screen, fireEvent, waitFor } = ReactTestingLibrary as any;

declare const describe: any;
declare const test: any;
declare const expect: any;
declare const jest: any;
declare const beforeEach: any;

describe("ProductDetailFlow Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset Zustand store state
    useCartStore.setState({
      items: [],
      addToCart: useCartStore.getState().addToCart,
    });
  });

  test("renders product details correctly", () => {
    render(
      <ToastProvider>
        <ProductDetailClient product={mockProduct} />
      </ToastProvider>,
    );

    expect(screen.getByText("Test Sneaker")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();
    expect(screen.getByText("Running shoe")).toBeInTheDocument();
    expect(screen.getByText("Nike")).toBeInTheDocument();
  });

  test("allows variant selection and adds to cart", async () => {
    render(
      <ToastProvider>
        <ProductDetailClient product={mockProduct} />
      </ToastProvider>,
    );

    // Select Color (Colors are Red and Blue in mock)
    const blueColorBtn = screen.getByTitle("Blue");
    fireEvent.click(blueColorBtn);

    // Click Add to Cart
    const addButton = screen.getByText("Add to Cart").closest("button");
    fireEvent.click(addButton);

    // Verify Button State Change
    await waitFor(() => {
      // Check for Toast
      expect(screen.getByRole("alert")).toHaveTextContent("Added to Cart");
    });

    // Wait for store update
    await waitFor(() => {
      expect(useCartStore.getState().items).toHaveLength(1);
    });

    // Verify Store Update
    const cartItems = useCartStore.getState().items;
    expect(cartItems).toHaveLength(1);
    expect(cartItems[0].id).toBe(1);
    expect(cartItems[0].selectedColor).toBe("Blue");
  });

  test("handles out of stock state", () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(
      <ToastProvider>
        <ProductDetailClient product={outOfStockProduct} />
      </ToastProvider>,
    );

    expect(screen.getByText("Out of Stock")).toBeInTheDocument();
    const addButton = screen.getByText("Add to Cart").closest("button");
    expect(addButton).toBeDisabled();
  });

  test("matches snapshot for product detail page", () => {
    const { container } = render(
      <ToastProvider>
        <ProductDetailClient product={mockProduct} />
      </ToastProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
