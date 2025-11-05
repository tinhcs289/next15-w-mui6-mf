import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createStateHooks, StatesProvider } from "./context";
import { ListStatesInitializer } from "./init-states";

type TestStates = {
  initialized: { states: boolean; request: boolean };
  idField: string;
  selectable: boolean;
  typeOfSelection: string;
  pageIndex: number;
  pageSize: number;
  defaultFilter?: any;
  fixedFilter?: any;
};

const { useGetPaginatedListState } = createStateHooks<TestStates>();

function TestWrapper({
  selector,
  testId,
}: {
  selector: (s: TestStates) => any;
  testId: string;
}) {
  const value = useGetPaginatedListState(selector as any);
  return <span data-testid={testId}>{JSON.stringify(value)}</span>;
}

describe("ListStatesInitializer", () => {
  it("should initialize default states when no props are passed", () => {
    render(
      <StatesProvider>
        <ListStatesInitializer />
        <TestWrapper selector={(s) => s?.initialized} testId="initialized" />
        <TestWrapper selector={(s) => s?.idField} testId="idField" />
        <TestWrapper selector={(s) => s?.selectable} testId="selectable" />
        <TestWrapper selector={(s) => s?.typeOfSelection} testId="typeOfSelection" />
      </StatesProvider>
    );

    expect(JSON.parse(screen.getByTestId("initialized").textContent || "{}").states).toBe(true);
    expect(screen.getByTestId("idField").textContent).toBe('"id"');
    expect(screen.getByTestId("selectable").textContent).toBe("true");
    expect(screen.getByTestId("typeOfSelection").textContent).toBe('"over-all-pages"');
  });

  it("should set initialized.states to true only when all inits are ready", () => {
    render(
      <StatesProvider>
        <ListStatesInitializer
          idField="myId"
          selectable={false}
          typeOfSelection="only-on-page"
          pageIndex={3}
          pageSize={50}
        />
        <TestWrapper selector={(s) => s?.initialized} testId="initialized" />
      </StatesProvider>
    );

    expect(JSON.parse(screen.getByTestId("initialized").textContent || "{}").states).toBe(true);
  });

  it("should apply passed props to state correctly", () => {
    render(
      <StatesProvider>
        <ListStatesInitializer
          idField="customId"
          selectable={false}
          typeOfSelection="over-all-pages"
          pageIndex={2}
          pageSize={10}
        />
        <TestWrapper selector={(s) => s?.idField} testId="idField" />
        <TestWrapper selector={(s) => s?.selectable} testId="selectable" />
        <TestWrapper selector={(s) => s?.typeOfSelection} testId="typeOfSelection" />
        <TestWrapper selector={(s) => s?.pageIndex} testId="pageIndex" />
        <TestWrapper selector={(s) => s?.pageSize} testId="pageSize" />
      </StatesProvider>
    );

    expect(screen.getByTestId("idField").textContent).toBe('"customId"');
    expect(screen.getByTestId("selectable").textContent).toBe("false");
    expect(screen.getByTestId("typeOfSelection").textContent).toBe('"over-all-pages"');
    expect(screen.getByTestId("pageIndex").textContent).toBe("2");
    expect(screen.getByTestId("pageSize").textContent).toBe("10");
  });

  it("should handle optional filters correctly", () => {
    type Filter = { name?: string; status?: string };
    const defaultFilter: Filter = { name: "test" };
    const fixedFilter: Filter = { status: "active" };

    render(
      <StatesProvider>
        <ListStatesInitializer defaultFilter={defaultFilter} fixedFilter={fixedFilter} />
        <TestWrapper selector={(s) => s?.defaultFilter} testId="defaultFilter" />
        <TestWrapper selector={(s) => s?.fixedFilter} testId="fixedFilter" />
      </StatesProvider>
    );

    expect(JSON.parse(screen.getByTestId("defaultFilter").textContent || "{}")).toEqual(defaultFilter);
    expect(JSON.parse(screen.getByTestId("fixedFilter").textContent || "{}")).toEqual(fixedFilter);
  });

  it("should update initialized.states if inits change", () => {
    const { rerender } = render(
      <StatesProvider>
        <ListStatesInitializer idField="id1" />
        <TestWrapper selector={(s) => s?.initialized} testId="initialized" />
      </StatesProvider>
    );

    expect(JSON.parse(screen.getByTestId("initialized").textContent || "{}").states).toBe(true);

    rerender(
      <StatesProvider>
        <ListStatesInitializer idField="id2" />
        <TestWrapper selector={(s) => s?.initialized} testId="initialized" />
      </StatesProvider>
    );

    expect(JSON.parse(screen.getByTestId("initialized").textContent || "{}").states).toBe(true);
  });
});
