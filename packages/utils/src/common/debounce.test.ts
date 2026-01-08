import type { Mock } from "vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import debounce from "./debounce";

describe("debounce", () => {
  let mockFn: Mock;

  beforeEach(() => {
    mockFn = vi.fn();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("should call function after the specified delay", async () => {
    const debounced = debounce(mockFn, 500);

    debounced("call 1");
    debounced("call 2");

    expect(mockFn).not.toHaveBeenCalled();

    await vi.advanceTimersByTime(500);

    expect(mockFn).toHaveBeenCalledOnce();
    expect(mockFn).toHaveBeenCalledWith("call 2");
  });

  it("should call function immediately if leading is true", async () => {
    const debounced = debounce(mockFn, 500, { leading: true });

    debounced("first call");
    debounced("second call");

    expect(mockFn).toHaveBeenCalledOnce();
    expect(mockFn).toHaveBeenCalledWith("first call");

    await vi.advanceTimersByTime(500);

    expect(mockFn).toHaveBeenCalledOnce();
    expect(mockFn).toHaveBeenCalledWith("first call");
  });

  it("should call function at the end of debounce delay if trailing is true", async () => {
    const debounced = debounce(mockFn, 500, { trailing: true });

    debounced("call 1");
    debounced("call 2");
    debounced("call 3");

    expect(mockFn).not.toHaveBeenCalled();

    await vi.advanceTimersByTime(500);

    expect(mockFn).toHaveBeenCalledOnce();
    expect(mockFn).toHaveBeenCalledWith("call 3");
  });

  it("should call function immediately if leading is true and trailing is false", async () => {
    const debounced = debounce(mockFn, 500, { leading: true, trailing: false });

    debounced("call 1");
    debounced("call 2");

    expect(mockFn).toHaveBeenCalledOnce();
    expect(mockFn).toHaveBeenCalledWith("call 1");

    await vi.advanceTimersByTime(500);

    expect(mockFn).toHaveBeenCalledOnce();
  });

  it("should call function within maxWait time", async () => {
    const debounced = debounce(mockFn, 500, { maxWait: 1000 });

    debounced("call 1");
    debounced("call 2");

    await vi.advanceTimersByTime(1000);

    expect(mockFn).toHaveBeenCalledOnce();
    expect(mockFn).toHaveBeenCalledWith("call 2");
  });

  it("should call function after maxWait if no other events happen", async () => {
    const debounced = debounce(mockFn, 500, { maxWait: 1000 });

    debounced("call 1");

    await vi.advanceTimersByTime(1000);

    expect(mockFn).toHaveBeenCalledOnce();
    expect(mockFn).toHaveBeenCalledWith("call 1");
  });

  it("should call function immediately when flush is called", async () => {
    const debounced = debounce(mockFn, 500);

    debounced("call 1");

    debounced.flush();

    expect(mockFn).toHaveBeenCalledOnce();
    expect(mockFn).toHaveBeenCalledWith("call 1");
  });

  it("should call function immediately with flush even if debounce time is not up", async () => {
    const debounced = debounce(mockFn, 500);

    debounced("call 1");

    debounced.flush();

    expect(mockFn).toHaveBeenCalledOnce();
    expect(mockFn).toHaveBeenCalledWith("call 1");
  });

  it("should cancel the debounce function call", async () => {
    const debounced = debounce(mockFn, 500);

    debounced("call 1");

    debounced.cancel();

    await vi.advanceTimersByTime(500);

    expect(mockFn).not.toHaveBeenCalled();
  });

  it("should handle multiple consecutive events correctly", async () => {
    const debounced = debounce(mockFn, 500);

    debounced("call 1");
    debounced("call 2");
    debounced("call 3");

    await vi.advanceTimersByTime(500);

    expect(mockFn).toHaveBeenCalledOnce();
    expect(mockFn).toHaveBeenCalledWith("call 3");
  });

  it("should handle consecutive events quickly", async () => {
    const debounced = debounce(mockFn, 500);

    debounced("first call");
    debounced("second call");
    debounced("third call");

    await vi.advanceTimersByTime(500);

    expect(mockFn).toHaveBeenCalledOnce();
    expect(mockFn).toHaveBeenCalledWith("third call");
  });

  it("should not trigger debounce until timeout has passed", async () => {
    const debounced = debounce(mockFn, 500);

    debounced("a");
    debounced("b");
    debounced("c");

    expect(mockFn).not.toHaveBeenCalled();

    await vi.advanceTimersByTime(500);

    expect(mockFn).toHaveBeenCalledOnce();
    expect(mockFn).toHaveBeenCalledWith("c");
  });
});
