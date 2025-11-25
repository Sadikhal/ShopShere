import React from "react";
import * as ReactTestingLibrary from "@testing-library/react";
import { Spinner } from "@/components/ui";

const { render } = ReactTestingLibrary as any;

declare const describe: any;
declare const test: any;
declare const expect: any;

describe("Spinner Component", () => {
  test("renders SVG element", () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("rounded-full");
  });
});
