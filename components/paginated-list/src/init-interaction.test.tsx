import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { StatesProvider, createStateHooks } from "./context";
import { InteractionInitializer } from "./init-interaction";

const { useGetPaginatedListState } = createStateHooks();

const wrapper = ({ children }: { children: ReactNode }) => (
  <StatesProvider>
    <InteractionInitializer />
    {children}
  </StatesProvider>
);

describe("InteractionInitializer", () => {
  it("should register setInteraction and setInteraction functions in state", async () => {
    const { result } = renderHook(
      () => {
        const setInteractionCallback = useGetPaginatedListState(
          (s) => s?.setInteraction
        );
        const clearInteractionCallback = useGetPaginatedListState(
          (s) => s?.clearInteraction
        );
        const currentAction = useGetPaginatedListState(
          (s) => s?.itemInteractAction
        );
        const currentInteractedItem = useGetPaginatedListState(
          (s) => s?.itemToInteract
        );
        const currentInteractedPosition = useGetPaginatedListState(
          (s) => s?.itemInteractAnchor
        );
        return {
          setInteractionCallback,
          clearInteractionCallback,
          currentAction,
          currentInteractedItem,
          currentInteractedPosition,
        };
      },
      { wrapper }
    );

    await waitFor(() => result.current);
    expect(result.current.setInteractionCallback).toBeTypeOf("function");
    expect(result.current.clearInteractionCallback).toBeTypeOf("function");
    expect(result.current.currentAction).toBe("");
    expect(result.current.currentInteractedItem).toBe(null);
    expect(result.current.currentInteractedPosition).toBe(null);
  });

  it("should update interaction states correctly when call setInteraction or clearInteraction", async () => {
    const { result } = renderHook(
      () => {
        const setInteractionCallback = useGetPaginatedListState(
          (s) => s?.setInteraction
        );
        const clearInteractionCallback = useGetPaginatedListState(
          (s) => s?.clearInteraction
        );
        const currentAction = useGetPaginatedListState(
          (s) => s?.itemInteractAction
        );
        const currentInteractedItem = useGetPaginatedListState(
          (s) => s?.itemToInteract
        );
        const currentInteractedPosition = useGetPaginatedListState(
          (s) => s?.itemInteractAnchor
        );

        return {
          setInteractionCallback,
          clearInteractionCallback,
          currentAction,
          currentInteractedItem,
          currentInteractedPosition,
        };
      },
      { wrapper }
    );

    await waitFor(() => result.current);

    const anchor1 = document.createElement("div");
    anchor1.id = "test-div-1";

    act(() => {
      result.current.setInteractionCallback!({
        action: "FIRST_ACTION",
        item: { id: 1, name: "item" },
        element: anchor1,
      });
    });

    expect(result.current.currentAction).toBe("FIRST_ACTION");
    expect(result.current.currentInteractedItem).toStrictEqual({
      id: 1,
      name: "item",
    });
    expect(result.current.currentInteractedPosition instanceof Element).toBe(
      true
    );
    expect((result.current.currentInteractedPosition as Element).id).toBe(
      "test-div-1"
    );

    const anchor2 = document.createElement("div");
    anchor2.id = "test-div-2";

    act(() => {
      result.current.clearInteractionCallback!();
    });

    act(() => {
      result.current.setInteractionCallback!({
        action: "SECOND_ACTION",
        item: { id: 2, name: "item 2" },
        element: anchor2,
      });
    });

    expect(result.current.currentAction).toBe("SECOND_ACTION");
    expect(result.current.currentInteractedItem).toStrictEqual({
      id: 2,
      name: "item 2",
    });
    expect(result.current.currentInteractedPosition instanceof Element).toBe(
      true
    );
    expect((result.current.currentInteractedPosition as Element).id).toBe(
      "test-div-2"
    );

    act(() => {
      result.current.clearInteractionCallback!();
    });

    expect(result.current.currentAction).toBe("");
    expect(result.current.currentInteractedItem).toBe(null);
    expect(result.current.currentInteractedPosition).toBe(null);
  });

  it("should keep current interacted item when keepInteract is true", async () => {
    const { result } = renderHook(
      () => {
        const setInteraction = useGetPaginatedListState(
          (s) => s?.setInteraction
        );
        const currentItem = useGetPaginatedListState((s) => s?.itemToInteract);
        return { setInteraction, currentItem };
      },
      { wrapper }
    );

    await waitFor(() => result.current);

    act(() => {
      result.current.setInteraction!({
        action: "FIRST_ACTION",
        item: { id: 10, name: "initial item" },
      });
    });

    expect(result.current.currentItem).toStrictEqual({
      id: 10,
      name: "initial item",
    });

    act(() => {
      result.current.setInteraction!({
        action: "SECOND_ACTION",
        keepInteract: true,
      });
    });

    expect(result.current.currentItem).toStrictEqual({
      id: 10,
      name: "initial item",
    });
  });

  it("should keep current anchor element when keepAnchor is true", async () => {
    const { result } = renderHook(
      () => {
        const setInteraction = useGetPaginatedListState(
          (s) => s?.setInteraction
        );
        const currentAnchor = useGetPaginatedListState(
          (s) => s?.itemInteractAnchor
        );
        return { setInteraction, currentAnchor };
      },
      { wrapper }
    );

    await waitFor(() => result.current);

    const anchor1 = document.createElement("div");
    anchor1.id = "anchor-1";

    act(() => {
      result.current.setInteraction!({
        action: "INIT_ACTION",
        element: anchor1,
      });
    });

    expect((result.current.currentAnchor as HTMLElement).id).toBe("anchor-1");

    act(() => {
      result.current.setInteraction!({
        action: "UPDATE_ACTION",
        keepAnchor: true,
      });
    });

    expect((result.current.currentAnchor as HTMLElement).id).toBe("anchor-1");
  });
});
