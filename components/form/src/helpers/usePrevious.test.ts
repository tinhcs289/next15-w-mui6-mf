import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import usePrevious from "./usePrevious";

describe("usePrevious", () => {
  it("should return undefined on first render", () => {
    const { result } = renderHook(() => usePrevious(10));
    expect(result.current).toBeNull();
  });

  it("should return previous value after value changes", () => {
    let value = 10;
    const { result, rerender } = renderHook(() => usePrevious(value));

    expect(result.current).toBeNull();

    value = 20;
    rerender();
    expect(result.current).toBe(10);

    value = 30;
    rerender();
    expect(result.current).toBe(20);
  });

  it("should work with multiple consecutive changes", () => {
    let value = "a";
    const { result, rerender } = renderHook(() => usePrevious(value));

    expect(result.current).toBeNull();

    value = "b";
    rerender();
    expect(result.current).toBe("a");

    value = "c";
    rerender();
    expect(result.current).toBe("b");

    value = "d";
    rerender();
    expect(result.current).toBe("c");
  });
});
