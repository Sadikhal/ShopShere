import { getColorClass, cn } from "@/components/ui";

declare const describe: any;
declare const test: any;
declare const expect: any;

describe("UI Utilities", () => {
  describe("getColorClass", () => {
    test("returns correct Tailwind classes for colors", () => {
      expect(getColorClass("Black")).toContain("bg-slate-900");
      expect(getColorClass("White")).toContain("bg-white");
      expect(getColorClass("Red")).toContain("bg-danger");
    });

    test("returns default class for unknown color", () => {
      expect(getColorClass("UnknownColor")).toContain("bg-slate-300");
    });
  });

  describe("cn (Classname Utility)", () => {
    test("merges classes correctly", () => {
      const result = cn("text-red-500", "bg-blue-500");
      expect(result).toContain("text-red-500");
      expect(result).toContain("bg-blue-500");
    });

    test("handles conditional classes", () => {
      const result = cn("text-red-500", false && "bg-blue-500", "p-4");
      expect(result).toContain("text-red-500");
      expect(result).not.toContain("bg-blue-500");
      expect(result).toContain("p-4");
    });
  });
});
