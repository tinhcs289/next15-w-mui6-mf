import { act, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DefineFeature from "./DefineFeature";
import type { UsePermissionScope } from "./context";
import { PermissionScopeProvider, usePermissionScope } from "./context";
import { oneOf, Permission } from "./permission-scope";

describe("DefineFeature", () => {
  it("should define a feature in PermissionScope", () => {
    let scope = null as unknown as UsePermissionScope;

    const TestComponent = () => {
      scope = usePermissionScope();
      return (
        <DefineFeature
          name="product_management"
          matchesWith={oneOf("view_product")}
        />
      );
    };

    render(
      <PermissionScopeProvider>
        <TestComponent />
      </PermissionScopeProvider>
    );

    expect(scope.getFeaturePermission("product_management")).toEqual(
      oneOf("view_product")
    );
  });

  it("should only define feature once even after re-render", () => {
    let callCount = 0;

    const spyDefine = vi.fn((name: string) => ({
      matchesWith: (clause: any) => {
        callCount++;
        return true;
      },
    }));

    const TestComponent = () => {
      const scope = usePermissionScope();
      scope.defineFeature = spyDefine;
      return (
        <DefineFeature
          name="product_management"
          matchesWith={oneOf("view_product")}
        />
      );
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

    expect(callCount).toBe(1);
  });

  it("should correctly allow user to use the defined feature", () => {
    let scope = null as unknown as UsePermissionScope;

    const TestComponent = () => {
      scope = usePermissionScope();
      return (
        <DefineFeature
          name="product_management"
          matchesWith={oneOf("view_product")}
        />
      );
    };

    render(
      <PermissionScopeProvider>
        <TestComponent />
      </PermissionScopeProvider>
    );

    expect(scope.canUseFeature("product_management")).toBe(false);

    act(() => {
      const policies: Permission[] = [
        { key: "view_product", name: "View Product" },
      ];
      scope.setUserPolicies(policies);
    });

    expect(scope.canUseFeature("product_management")).toBe(true);
  });
});
