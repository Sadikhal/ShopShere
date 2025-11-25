import React from "react";
import * as ReactTestingLibrary from "@testing-library/react";
import { Input } from "@/components/ui";

const { render, screen, fireEvent } = ReactTestingLibrary as any;

declare const describe: any;
declare const test: any;
declare const expect: any;
declare const jest: any;

describe("Input Component", () => {
  test("renders and accepts text input", () => {
    const handleChange = jest.fn();
    render(<Input placeholder="Type here" onChange={handleChange} />);

    const input = screen.getByPlaceholderText("Type here");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Hello World" } });
    expect(handleChange).toHaveBeenCalled();
  });

  test("applies custom class names", () => {
    render(<Input className="custom-class" />);
    // Queries the input by role since it doesn't have a placeholder/label
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });
});
