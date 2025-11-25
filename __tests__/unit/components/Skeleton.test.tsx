import React from "react";
import * as ReactTestingLibrary from "@testing-library/react";
import { Skeleton } from "@/components/ui/skeleton";

const { render } = ReactTestingLibrary as any;

declare const describe: any;
declare const test: any;
declare const expect: any;

describe("Skeleton Component", () => {
  test("renders skeleton element", () => {
    const { container } = render(<Skeleton />);

    const skeleton = container.querySelector(".animate-pulse");
    expect(skeleton).toBeInTheDocument();
  });

  test("applies default classes", () => {
    const { container } = render(<Skeleton />);

    const skeleton = container.querySelector(".animate-pulse");
    expect(skeleton).toHaveClass("rounded-md");
    expect(skeleton).toHaveClass("bg-bg-tertiary");
  });

  test("applies custom className", () => {
    const { container } = render(<Skeleton className="w-full h-20" />);

    const skeleton = container.querySelector(".animate-pulse");
    expect(skeleton).toHaveClass("w-full");
    expect(skeleton).toHaveClass("h-20");
  });

  test("passes through additional props", () => {
    const { container } = render(<Skeleton data-testid="custom-skeleton" />);

    expect(
      container.querySelector('[data-testid="custom-skeleton"]'),
    ).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { container } = render(<Skeleton className="w-32 h-4" />);

    expect(container).toMatchSnapshot();
  });
});
