import React from "react";
import * as ReactTestingLibrary from "@testing-library/react";
import CartClient from "@/components/CartClient";
import { useCartStore, useOrderStore } from "@/lib/store";
import { ToastProvider } from "@/components/ui";
import { mockProduct } from "@/__tests__/mocks/data";

const { render, screen, fireEvent, waitFor } = ReactTestingLibrary as any;

declare const describe: any;
declare const test: any;
declare const expect: any;
declare const jest: any;
declare const beforeEach: any;

describe("CheckoutFlow Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCartStore.setState({
      items: [
        {
          ...mockProduct,
          cartItemId: "1-Red-10",
          quantity: 1,
          selectedColor: "Red",
          selectedSize: "10",
        },
      ],
      addToCart: useCartStore.getState().addToCart,
      updateQuantity: useCartStore.getState().updateQuantity,
      removeFromCart: useCartStore.getState().removeFromCart,
      clearCart: useCartStore.getState().clearCart,
      totalPrice: () => 100,
    });
    useOrderStore.setState({
      orders: [],
      addOrder: useOrderStore.getState().addOrder,
    });
  });

  test("displays cart items correctly", () => {
    render(
      <ToastProvider>
        <CartClient />
      </ToastProvider>,
    );

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Test Sneaker")).toBeInTheDocument();
    expect(screen.getAllByText("$100.00")[0]).toBeInTheDocument();
  });

  test("proceeds to checkout and places order", async () => {
    render(
      <ToastProvider>
        <CartClient />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByText("Proceed to Checkout"));

    expect(screen.getByText("Shipping Information")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Street Address"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByPlaceholderText("City"), {
      target: { value: "New York" },
    });
    fireEvent.change(screen.getByPlaceholderText("ZIP Code"), {
      target: { value: "10001" },
    });
    fireEvent.change(screen.getByPlaceholderText("Card Number (Dummy Only)"), {
      target: { value: "4242424242424242" },
    });
    fireEvent.change(screen.getByPlaceholderText("MM/YY"), {
      target: { value: "12/25" },
    });
    fireEvent.change(screen.getByPlaceholderText("CVC"), {
      target: { value: "123" },
    });

    // Wait for form to become valid and button to be enabled
    await waitFor(() => {
      const placeOrderButton = screen.getByText("Place Order");
      expect(placeOrderButton).not.toBeDisabled();
    });

    // Place Order
    fireEvent.click(screen.getByText("Place Order"));

    // Wait for Success
    await waitFor(
      () => {
        expect(
          screen.getByText("Order Placed Successfully!"),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // Verify Cart Cleared
    expect(useCartStore.getState().items).toHaveLength(0);
    // Verify Order Created
    expect(useOrderStore.getState().orders).toHaveLength(1);
  });

  test("matches snapshot for cart page", () => {
    const { container } = render(
      <ToastProvider>
        <CartClient />
      </ToastProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
