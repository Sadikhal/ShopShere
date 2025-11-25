import React from "react";
import * as ReactTestingLibrary from "@testing-library/react";
import OrderHistoryClient from "@/components/OrderHistoryClient";
import { useOrderStore } from "@/lib/store";

const { render, screen } = ReactTestingLibrary as any;

declare const describe: any;
declare const test: any;
declare const expect: any;
declare const jest: any;

describe("OrderHistoryFlow Integration Tests", () => {
  test("displays orders when history exists", () => {
    useOrderStore.setState({
      orders: [
        {
          id: "ORD-1234",
          date: new Date().toISOString(),
          items: [],
          total: 150.0,
          status: "placed",
          shippingInfo: { name: "John", email: "john@example.com", address: "123 St", city: "City", zip: "12345" },
        },
      ],
      addOrder: jest.fn(),
    });

    render(<OrderHistoryClient />);

    expect(screen.getByText("Order History")).toBeInTheDocument();
    expect(screen.getByText("ORD-1234")).toBeInTheDocument();
    expect(screen.getByText("$150.00")).toBeInTheDocument();
  });

  test("displays empty state when no orders", () => {
    useOrderStore.setState({ orders: [], addOrder: jest.fn() });

    render(<OrderHistoryClient />);

    expect(screen.getByText("No orders yet")).toBeInTheDocument();
  });

  test("matches snapshot for order history page", () => {
    useOrderStore.setState({
      orders: [
        {
          id: "ORD-1234",
          date: new Date("2024-01-01").toISOString(),
          items: [],
          total: 150.0,
          status: "placed",
          shippingInfo: { name: "John", email: "john@example.com", address: "123 St", city: "City", zip: "673939" },
        },
      ],
      addOrder: jest.fn(),
    });

    const { container } = render(<OrderHistoryClient />);

    expect(container).toMatchSnapshot();
  });
});
