import { render, screen } from "@testing-library/react";
import type { RefObject } from "react";
import { forwardRef } from "react";
import { describe, expect, it, vi } from "vitest";
import mergeRefs from "./mergeRefs";

describe("mergeRefs", () => {
  it("should assign node to a RefObject", () => {
    const ref1 = { current: null } as unknown as RefObject<HTMLInputElement>;

    const MergedInput = () => (
      <input ref={mergeRefs(ref1)} data-testid="input" />
    );

    render(<MergedInput />);
    const input = screen.getByTestId("input");

    expect(ref1.current).toBe(input);
  });

  it("should call callback ref with the node", () => {
    const callbackRef = vi.fn();

    const MergedInput = () => (
      <input ref={mergeRefs(callbackRef)} data-testid="input" />
    );

    render(<MergedInput />);
    const input = screen.getByTestId("input");

    expect(callbackRef).toHaveBeenCalledTimes(1);
    expect(callbackRef).toHaveBeenCalledWith(input);
  });

  it("should handle undefined refs gracefully", () => {
    const ref1 = undefined;
    const callbackRef = vi.fn();

    const MergedInput = () => (
      <input ref={mergeRefs(ref1, callbackRef)} data-testid="input" />
    );

    render(<MergedInput />);
    const input = screen.getByTestId("input");

    expect(callbackRef).toHaveBeenCalledTimes(1);
    expect(callbackRef).toHaveBeenCalledWith(input);
  });

  it("should assign node to multiple refs", () => {
    const ref1 = { current: null } as unknown as RefObject<HTMLInputElement>;
    const ref2 = { current: null } as unknown as RefObject<HTMLInputElement>;
    const callbackRef = vi.fn();

    const MergedInput = () => (
      <input ref={mergeRefs(ref1, ref2, callbackRef)} data-testid="input" />
    );

    render(<MergedInput />);
    const input = screen.getByTestId("input");

    // RefObjects
    expect(ref1.current).toBe(input);
    expect(ref2.current).toBe(input);

    // Callback ref
    expect(callbackRef).toHaveBeenCalledTimes(1);
    expect(callbackRef).toHaveBeenCalledWith(input);
  });

  it("should work with forwardRef components", () => {
    const ref1 = { current: null } as unknown as RefObject<HTMLInputElement>;
    const callbackRef = vi.fn();

    const ForwardedInput = forwardRef<HTMLInputElement>((props, ref) => {
      return (
        <input
          ref={mergeRefs(ref, ref1, callbackRef)}
          {...props}
          data-testid="input"
        />
      );
    });

    render(<ForwardedInput />);
    const input = screen.getByTestId("input");

    expect(ref1.current).toBe(input);
    expect(callbackRef).toHaveBeenCalledWith(input);
  });

  it("should handle null when unmounting", () => {
    const ref1 = { current: null } as unknown as RefObject<HTMLInputElement>;
    const callbackRef = vi.fn();

    const { unmount } = render(
      <input ref={mergeRefs(ref1, callbackRef)} data-testid="input" />
    );
    const input = screen.getByTestId("input");

    // Initial mount
    expect(ref1.current).toBe(input);
    expect(callbackRef).toHaveBeenCalledWith(input);

    // Unmount
    unmount();

    expect(ref1.current).toBe(null);
    expect(callbackRef).toHaveBeenCalledWith(null);
  });

  it("should handle null refs gracefully", () => {
    const ref1 = null;
    const callbackRef = vi.fn();

    const MergedInput = () => (
      <input ref={mergeRefs(ref1, callbackRef)} data-testid="input" />
    );

    render(<MergedInput />);
    const input = screen.getByTestId("input");

    expect(callbackRef).toHaveBeenCalledTimes(1);
    expect(callbackRef).toHaveBeenCalledWith(input);
  });

  it("should handle mixture of null, undefined, callback, and RefObject", () => {
    const refObj1 = { current: null } as unknown as RefObject<HTMLInputElement>;
    const refObj2 = { current: null } as unknown as RefObject<HTMLInputElement>;
    const callbackRef = vi.fn();
    const nullRef = null;
    const undefinedRef = undefined;

    const MergedInput = () => (
      <input
        ref={mergeRefs(refObj1, nullRef, undefinedRef, callbackRef, refObj2)}
        data-testid="input"
      />
    );

    render(<MergedInput />);
    const input = screen.getByTestId("input");

    expect(refObj1.current).toBe(input);
    expect(refObj2.current).toBe(input);
    expect(callbackRef).toHaveBeenCalledWith(input);
  });

  it("should call refs with null on unmount", () => {
    const refObj = { current: null } as unknown as RefObject<HTMLInputElement>;
    const callbackRef = vi.fn();

    const { unmount } = render(
      <input ref={mergeRefs(refObj, callbackRef)} data-testid="input" />
    );

    const input = screen.getByTestId("input");
    expect(refObj.current).toBe(input);
    expect(callbackRef).toHaveBeenCalledWith(input);

    // Unmount component
    unmount();

    expect(refObj.current).toBe(null);
    expect(callbackRef).toHaveBeenCalledWith(null);
  });

  it("should work with forwardRef and multiple merges", () => {
    const refObj1 = { current: null } as unknown as RefObject<HTMLInputElement>;
    const refObj2 = { current: null } as unknown as RefObject<HTMLInputElement>;
    const callbackRef = vi.fn();

    const ForwardedInput = forwardRef<HTMLInputElement>((props, ref) => {
      return (
        <input
          ref={mergeRefs(ref, refObj1, callbackRef, refObj2)}
          {...props}
          data-testid="input"
        />
      );
    });

    render(<ForwardedInput />);
    const input = screen.getByTestId("input");

    expect(refObj1.current).toBe(input);
    expect(refObj2.current).toBe(input);
    expect(callbackRef).toHaveBeenCalledWith(input);
  });
});
