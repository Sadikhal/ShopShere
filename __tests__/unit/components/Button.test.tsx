import React from "react";
import * as ReactTestingLibrary from "@testing-library/react";
import { Button } from "@/components/ui";

const { render, screen, fireEvent } = ReactTestingLibrary as any;

declare const describe: any;
declare const test: any;
declare const expect: any;
declare const jest: any;

describe("Button Component", () => {
  test("renders correctly and handles click", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByText("Click Me");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies variant classes correctly", () => {
    render(<Button variant="danger">Delete</Button>);
    const button = screen.getByText("Delete");
    expect(button).toHaveClass("bg-danger");
  });

  test("applies outline variant correctly", () => {
    render(<Button variant="outline">Cancel</Button>);
    const button = screen.getByText("Cancel");
    expect(button).toHaveClass("border");
    expect(button).toHaveClass("bg-transparent");
  });
});
