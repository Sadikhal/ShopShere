import * as ReactTestingLibrary from "@testing-library/react";
import { Badge } from "@/components/ui";

const { render, screen } = ReactTestingLibrary as any;

declare const describe: any;
declare const test: any;
declare const expect: any;

describe("Badge Component", () => {
  test("renders children text", () => {
    render(<Badge>New Arrival</Badge>);
    expect(screen.getByText("New Arrival")).toBeInTheDocument();
  });

  test("applies default styles", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge).toHaveClass("rounded-full");
    expect(badge).toHaveClass("bg-indigo-100");
  });
});
