import React from "react";
import * as ReactTestingLibrary from "@testing-library/react";
import { ToastProvider, useToast } from "@/components/ui";

const { render, screen, fireEvent } = ReactTestingLibrary as any;

declare const describe: any;
declare const test: any;
declare const expect: any;

describe("Toast Component", () => {
  const TestComponent = () => {
    const { toast } = useToast();
    return (
      <button
        onClick={() =>
          toast({ title: "Test Toast", description: "This is a test" })
        }
      >
        Show Toast
      </button>
    );
  };

  test("renders toast when triggered", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    const button = screen.getByText("Show Toast");
    fireEvent.click(button);

    expect(screen.getByText("Test Toast")).toBeInTheDocument();
    expect(screen.getByText("This is a test")).toBeInTheDocument();
  });

  test("removes toast when close button clicked", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByText("Show Toast"));
    expect(screen.getByText("Test Toast")).toBeInTheDocument();

    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);

    expect(screen.queryByText("Test Toast")).not.toBeInTheDocument();
  });
});
