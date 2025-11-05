import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatesProvider, createStateHooks } from "./context";

const {
  useGetPaginatedListState,
  useSetPaginatedListState,
  useInitPaginatedListState,
  usePaginatedListCallback,
} = createStateHooks();

function Counter() {
  const count = useGetPaginatedListState((s) => s?.totalCount || 0);
  const setState = useSetPaginatedListState();

  return (
    <div>
      <p data-testid="count">{count}</p>
      <button
        type="button"
        onClick={() =>
          setState((prev) => ({ totalCount: (prev?.totalCount || 0) + 1 }))
        }
      >
        Increase
      </button>
    </div>
  );
}

function InitOnceComponent({ value }: { value: any }) {
  useInitPaginatedListState("pageSize", value);
  const pageSize = useGetPaginatedListState((s) => s?.pageSize);
  return <p data-testid="pageSize">{pageSize}</p>;
}

function InitAlwaysComponent({ value }: { value: any }) {
  useInitPaginatedListState("pageSize", value, {
    when: "whenever-value-changes",
  });
  const pageSize = useGetPaginatedListState((s) => s?.pageSize);
  return <p data-testid="pageSize">{pageSize}</p>;
}

function CallbackComponent({ multiplier }: { multiplier: number }) {
  const callback = usePaginatedListCallback(
    "multiply",
    (n: number) => n * multiplier,
    [multiplier]
  );

  return (
    <button
      data-testid="callback"
      onClick={() => {
        const resultNode = screen.getByTestId("result");
        resultNode.textContent = String(callback(2));
      }}
    >
      RunCallback
    </button>
  );
}

describe("PaginatedListStates Context", () => {
  it("should provide initial state when mounted with StatesProvider", () => {
    render(
      <StatesProvider>
        <Counter />
      </StatesProvider>
    );

    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("should update state and trigger re-render when useSetState is called", () => {
    render(
      <StatesProvider>
        <Counter />
      </StatesProvider>
    );

    const button = screen.getByRole("button");
    act(() => button.click());

    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  it("should initialize a field once when useInitState uses 'once-on-mount'", async () => {
    const { rerender } = render(
      <StatesProvider>
        <InitOnceComponent value={50} />
      </StatesProvider>
    );

    expect(screen.getByTestId("pageSize")).toHaveTextContent("50");

    // rerender with a new prop — should NOT update
    rerender(
      <StatesProvider>
        <InitOnceComponent value={99} />
      </StatesProvider>
    );

    expect(screen.getByTestId("pageSize")).toHaveTextContent("50");
  });

  it("should update the field when useInitState uses 'whenever-value-changes'", async () => {
    const { rerender } = render(
      <StatesProvider>
        <InitAlwaysComponent value={20} />
      </StatesProvider>
    );

    expect(screen.getByTestId("pageSize")).toHaveTextContent("20");

    rerender(
      <StatesProvider>
        <InitAlwaysComponent value={30} />
      </StatesProvider>
    );

    expect(screen.getByTestId("pageSize")).toHaveTextContent("30");
  });

  it("should keep callback stable and update it when dependencies change", () => {
    const { rerender } = render(
      <StatesProvider>
        <>
          <div data-testid="result"></div>
          <CallbackComponent multiplier={2} />
        </>
      </StatesProvider>
    );

    const button = screen.getByTestId("callback");
    act(() => button.click());
    expect(screen.getByTestId("result")).toHaveTextContent("4");

    // Change deps → callback should be re-created
    rerender(
      <StatesProvider>
        <>
          <div data-testid="result"></div>
          <CallbackComponent multiplier={3} />
        </>
      </StatesProvider>
    );

    act(() => button.click());
    expect(screen.getByTestId("result")).toHaveTextContent("6");
  });
});
