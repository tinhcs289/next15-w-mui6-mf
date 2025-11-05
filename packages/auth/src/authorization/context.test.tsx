import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PermissionScopeProvider, usePermissionScope } from "./context";
import type { Permission } from "./permission-scope";

describe("PermissionScopeContext", () => {
  it("should throw an error when used outside of PermissionScopeProvider", () => {
    const TestComponent = () => {
      usePermissionScope();
      return null;
    };

    expect(() => render(<TestComponent />)).toThrowError(
      "[usePermissionScopeContext] must be used within a [PermissionScopeProvider]"
    );
  });

  it("should provide a PermissionScope instance when inside PermissionScopeProvider", () => {
    const TestComponent = () => {
      const scope = usePermissionScope();
      expect(scope).toBeTruthy();
      expect(typeof scope.setUserPolicies).toBe("function");
      return <div data-testid="ok">OK</div>;
    };

    render(
      <PermissionScopeProvider>
        <TestComponent />
      </PermissionScopeProvider>
    );

    expect(screen.getByTestId("ok")).toBeInTheDocument();
  });

  it("should re-render component when PermissionScope notifies subscribers", () => {
    let capturedScope: ReturnType<typeof usePermissionScope> | null = null;

    const TestComponent = () => {
      const scope = usePermissionScope();
      capturedScope = scope;
      const canUse = scope.canUseFeature("product_management");
      return <div data-testid="status">{canUse ? "YES" : "NO"}</div>;
    };

    render(
      <PermissionScopeProvider>
        <TestComponent />
      </PermissionScopeProvider>
    );

    const status = screen.getByTestId("status");
    expect(status.textContent).toBe("NO");

    act(() => {
      capturedScope!
        .defineFeature("product_management")
        .matchesWith({ type: "oneOf", permissions: ["view_product"] });

      const policies: Permission[] = [
        { key: "view_product", name: "View Product" },
      ];
      capturedScope!.setUserPolicies(policies);
    });

    expect(screen.getByTestId("status").textContent).toBe("YES");
  });

  it("should create a new PermissionScope instance when a new provider is mounted", () => {
    let firstInstance: any = null;
    let secondInstance: any = null;

    const TestComponent = () => {
      const scope = usePermissionScope();
      if (!firstInstance) firstInstance = scope;
      else secondInstance = scope;
      return <div />;
    };

    render(
      <PermissionScopeProvider>
        <TestComponent />
      </PermissionScopeProvider>
    );

    render(
      <PermissionScopeProvider>
        <TestComponent />
      </PermissionScopeProvider>
    );

    expect(firstInstance).not.toBe(secondInstance);
  });

  it("should keep the same PermissionScope instance when re-rendering within the same provider", () => {
    let instance1: any;
    let instance2: any;

    const TestComponent = () => {
      const scope = usePermissionScope();
      if (!instance1) instance1 = scope;
      else instance2 = scope;
      return <div />;
    };

    const { rerender } = render(
      <PermissionScopeProvider>
        <TestComponent />
      </PermissionScopeProvider>
    );

    rerender(
      <PermissionScopeProvider>
        <TestComponent />
      </PermissionScopeProvider>
    );

    expect(instance1).toBe(instance2);
  });

  it("should unsubscribe from PermissionScope when component unmounts", () => {
    const scopeCallbacks: (() => void)[] = [];

    const TestComponent = () => {
      const scope = usePermissionScope();
      const unsub = scope.subscribe(() => scopeCallbacks.push(() => {}));
      return (
        <div data-testid="unsub" onClick={() => unsub()}>
          Unsub
        </div>
      );
    };

    const { unmount } = render(
      <PermissionScopeProvider>
        <TestComponent />
      </PermissionScopeProvider>
    );

    unmount();
    expect(scopeCallbacks.length).toBe(0);
  });

  it("should return same snapshot when PermissionScope has no changes", () => {
    let first: any;
    let second: any;

    const TestComponent = () => {
      const scope = usePermissionScope();
      if (!first) first = scope;
      else second = scope;
      return null;
    };

    const { rerender } = render(
      <PermissionScopeProvider>
        <TestComponent />
      </PermissionScopeProvider>
    );

    rerender(
      <PermissionScopeProvider>
        <TestComponent />
      </PermissionScopeProvider>
    );

    expect(first).toBe(second);
  });
});
