import { act, renderHook, waitFor } from "@testing-library/react";
import type { FC } from "react";
import type { Mock } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createStatesContext } from "./createStatesContext";
import isEqual from "./isEqual";

vi.mock("./isEqual");

beforeEach(() => {
  (isEqual as Mock).mockImplementation((a, b) => {
    if (typeof a === "function" && typeof b === "function") {
      return Object.is(a, b);
    }
    if (typeof a === "function" || typeof b === "function") {
      return false;
    }
    try {
      return JSON.stringify(a) === JSON.stringify(b);
    } catch {
      return false;
    }
  });
});

type State = {
  count?: number | null;
  text?: string | null;
  callback?: () => void;
};

const {
  StatesProvider,
  useGetState,
  useSetState,
  useInitState,
  useCallbackState,
} = createStatesContext<State>();

const wrapper: FC<{ [x: string]: any }> = ({ children, ..._otherProps }) => {
  return <StatesProvider>{children}</StatesProvider>;
};

const initialState: State = { count: 42, text: "hello" };

const {
  StatesProvider: ProviderWithInitial,
  useGetState: useGetWithInitial,
  useSetState: useSetWithInitial,
} = createStatesContext<State>(initialState);

const wrapperWithInitial: FC<{ [x: string]: any }> = ({ children }) => (
  <ProviderWithInitial>{children}</ProviderWithInitial>
);

describe("createStatesContext", () => {
  it("[StatesProvider] should throw error if used outside provider", () => {
    const { useGetState } = createStatesContext<{ count: number }>();

    const render = () => renderHook(() => useGetState((s) => s?.count));

    expect(render).toThrow("Store not found");
  });

  it("[useGetState][useSetState] should get and set state correctly", () => {
    const { result } = renderHook(
      () => {
        const get = useGetState((s) => s?.count);
        const set = useSetState();
        return { get, set };
      },
      { wrapper }
    );

    expect(result.current.get).toBeUndefined();

    act(() => {
      result.current.set({ count: 5 });
    });

    expect(result.current.get).toBe(5);
  });

  it("[useGetState] should support complex selectors", () => {
    const { result } = renderHook(
      () => {
        const complex = useGetState((s) => ({
          count: s?.count,
          text: s?.text,
        }));
        const set = useSetState();
        return { complex, set };
      },
      { wrapper }
    );

    expect(result.current.complex).toEqual({
      count: undefined,
      text: undefined,
    });

    act(() => {
      result.current.set({ count: 10, text: "hello" });
    });

    expect(result.current.complex).toEqual({ count: 10, text: "hello" });
  });

  it("[useGetState] get selector returns undefined for non-existing keys", () => {
    const { result } = renderHook(
      () => useGetState((s) => (s as any)?.nonExist),
      { wrapper }
    );

    expect(result.current).toBeUndefined();
  });

  it("[useGetState] should return arrays or objects correctly", () => {
    const { result } = renderHook(
      () => {
        useSetState()({ count: 1, text: "abc" });
        return useGetState((s) => [s?.count, s?.text]);
      },
      { wrapper }
    );
    expect(result.current).toEqual([1, "abc"]);
  });

  it("[useSetState] should support functional state updates", () => {
    const { result } = renderHook(
      () => {
        const get = useGetState((s) => s?.count);
        const set = useSetState();
        return { get, set };
      },
      { wrapper }
    );

    act(() => {
      result.current.set({ count: 1 });
    });

    act(() => {
      result.current.set((prev) => ({ count: (prev?.count ?? 0) + 1 }));
    });

    expect(result.current.get).toBe(2);
  });

  it("[useSetState] should handle null and undefined", () => {
    const { result } = renderHook(
      () => {
        const set = useSetState();
        const get = useGetState((s) => s?.count);
        return { set, get };
      },
      { wrapper }
    );

    act(() => {
      result.current.set({ count: null });
    });
    expect(result.current.get).toBeNull();

    act(() => {
      result.current.set({ count: undefined });
    });
    expect(result.current.get).toBeUndefined();
  });

  it("[useSetState] should update state correctly after multiple set calls", () => {
    const { result } = renderHook(
      () => {
        const set = useSetState();
        const get = useGetState((s) => s?.count);
        return { set, get };
      },
      { wrapper }
    );

    act(() => {
      result.current.set({ count: 1 });
      result.current.set({ count: 2 });
      result.current.set({ count: 3 });
    });

    expect(result.current.get).toBe(3);
  });

  it("[useSetState] handles undefined and null initial state", () => {
    const { result } = renderHook(
      () => {
        const get = useGetState((s) => s?.text);
        const set = useSetState();
        return { get, set };
      },
      { wrapper }
    );

    expect(result.current.get).toBeUndefined();

    act(() => {
      result.current.set({ text: null });
    });

    expect(result.current.get).toBeNull();
  });

  it("[useSetState] does not rerender when setState called with equal value", () => {
    (isEqual as Mock).mockReturnValue(true); // simulate values equal
    let renderCount = 0;
    const { result } = renderHook(
      () => {
        renderCount++;
        const get = useGetState((s) => s?.count);
        const set = useSetState();
        return { get, set };
      },
      { wrapper }
    );
    const prevRenderCount = renderCount;
    act(() => {
      result.current.set({ count: 5 }); // Should NOT rerender
    });
    expect(renderCount).toBe(prevRenderCount); // no rerender
  });

  it("[useInitState] should not re-initialize state if isEqual returns true", () => {
    (isEqual as Mock).mockReturnValue(true);
    const { result } = renderHook(
      () => {
        const initialized = useInitState("text", "hello", {
          when: "whenever-value-changes",
        });
        return { initialized };
      },
      { wrapper }
    );

    expect(isEqual).toHaveBeenCalled();
    expect(result.current.initialized).toBe(false);
  });

  it("[useInitState] should initialize state when isEqual returns false", () => {
    (isEqual as Mock).mockReturnValue(false);
    const { result } = renderHook(
      () => {
        const initialized = useInitState("text", "hello", {
          when: "whenever-value-changes",
        });
        return { initialized };
      },
      { wrapper }
    );

    expect(isEqual).toHaveBeenCalled();
    expect(result.current.initialized).toBe(true);
  });

  it("[useInitState] should respect 'once-on-mount' and not update again", () => {
    const { result, rerender } = renderHook(
      ({ val }: { val: string }) => {
        useInitState("text", val, { when: "once-on-mount" });
        return useGetState((state) => state?.text);
      },
      { wrapper, initialProps: { val: "initial" } }
    );

    expect(result.current).toBe("initial");

    rerender({ val: "changed" });

    expect(result.current).toBe("initial");
  });

  it("[useCallbackState] should store and update callback with useCallbackState", async () => {
    type CB = (params: string) => void;
    const callback = vi.fn() as CB;
    const { result } = renderHook(
      () => {
        useCallbackState("callback", callback, []);
        return useGetState((s) => s?.callback);
      },
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current).not.toBeUndefined();
    });

    expect(typeof result.current).toBe("function");

    act(() => {
      (result.current as CB)?.("test");
    });

    expect(callback).toHaveBeenCalledWith("test");
  });

  it("[useCallbackState] should update callback when deps change", () => {
    let cb = vi.fn();
    const { rerender } = renderHook(
      ({ callback }: { callback: () => void }) => {
        useCallbackState("callback", callback, [callback]);
        return useGetState((s) => s?.callback);
      },
      { wrapper, initialProps: { callback: cb } }
    );

    const newCb = vi.fn();
    rerender({ callback: newCb });

    act(() => {
      (newCb as any)("test");
    });

    expect(newCb).toHaveBeenCalledWith("test");
  });

  it("[with initialState] should initialize with given initialState", () => {
    const { result } = renderHook(() => useGetWithInitial((s) => s?.count), {
      wrapper: wrapperWithInitial,
    });
    expect(result.current).toBe(42);
  });

  it("[with initialState] should update state correctly from initialState", () => {
    const { result } = renderHook(
      () => {
        const get = useGetWithInitial((s) => s?.text);
        const set = useSetWithInitial();
        return { get, set };
      },
      { wrapper: wrapperWithInitial }
    );

    expect(result.current.get).toBe("hello");

    act(() => {
      result.current.set({ text: "world" });
    });

    expect(result.current.get).toBe("world");
  });
});
