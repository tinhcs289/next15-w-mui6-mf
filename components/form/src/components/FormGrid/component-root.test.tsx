import { act, renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";
import { FormGrid, useFormContext } from "./component-root";

const mockSubmit = vi.fn();

type FormValues = {
  name?: string;
  age?: number;
  childs?: { name?: string; age?: number }[];
};

const wrapper = ({ children }: PropsWithChildren) => (
  <FormGrid onSubmitForm={mockSubmit}>{children}</FormGrid>
);

describe("FormGrid", () => {
  it("should register 'dispatchSubmit' in form context", async () => {
    const { result } = renderHook(() => useFormContext<FormValues>(), {
      wrapper,
    });

    await waitFor(() => result.current);

    expect(result.current.dispatchSubmit).toBeTypeOf("function");

    act(() => {
      result.current.setValue("name", "John Doe");
      result.current.setValue("age", 34);
      result.current.setValue("childs", [
        { name: "Bob", age: 5 },
        { name: "Lily", age: 3 },
      ]);
      result.current.dispatchSubmit!("custom_submit");
    });

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    const [values, reason] = mockSubmit.mock.calls[0];
    expect(reason).toBe("custom_submit");
    expect(values).toStrictEqual({
      name: "John Doe",
      age: 34,
      childs: [
        { name: "Bob", age: 5 },
        { name: "Lily", age: 3 },
      ],
    });
  });
});
