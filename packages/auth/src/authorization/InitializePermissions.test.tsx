import { act, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InitializePermissions from "./InitializePermissions";
import type { UsePermissionScope } from "./context";
import { PermissionScopeProvider, usePermissionScope } from "./context";
import type { Permission } from "./permission-scope";

describe("InitializePermissions", () => {
  it("should set user permissions on mount", () => {
    let scope = null as unknown as UsePermissionScope;
    const initialPermissions: Permission[] = [
      { key: "view_product", name: "View Product" },
    ];

    const TestComponent = () => {
      scope = usePermissionScope();
      return <InitializePermissions permissions={initialPermissions} />;
    };

    render(
      <PermissionScopeProvider>
        <TestComponent />
      </PermissionScopeProvider>
    );

    expect(scope.canUseFeature("view_product")).toBe(false);
    expect(
      scope
        .allowedWhen(initialPermissions)
        .matchesWith({ type: "oneOf", permissions: ["view_product"] })
    ).toBe(true);
  });

  it("should update permissions when props change", () => {
    let scope = null as unknown as UsePermissionScope;
    const firstPermissions: Permission[] = [
      { key: "view_product", name: "View Product" },
    ];
    const secondPermissions: Permission[] = [
      { key: "edit_product", name: "Edit Product" },
    ];

    const TestComponent = ({ perms }: { perms: Permission[] }) => {
      scope = usePermissionScope();
      return <InitializePermissions permissions={perms} />;
    };

    const { rerender } = render(
      <PermissionScopeProvider>
        <TestComponent perms={firstPermissions} />
      </PermissionScopeProvider>
    );

    expect(
      scope
        .allowedWhen(firstPermissions)
        .matchesWith({ type: "oneOf", permissions: ["view_product"] })
    ).toBe(true);

    act(() => {
      rerender(
        <PermissionScopeProvider>
          <TestComponent perms={secondPermissions} />
        </PermissionScopeProvider>
      );
    });

    expect(
      scope
        .allowedWhen(secondPermissions)
        .matchesWith({ type: "oneOf", permissions: ["edit_product"] })
    ).toBe(true);
  });

  it("should handle empty permissions array without errors", () => {
    let scope = null as unknown as UsePermissionScope;

    const TestComponent = () => {
      scope = usePermissionScope();
      return <InitializePermissions permissions={[]} />;
    };

    render(
      <PermissionScopeProvider>
        <TestComponent />
      </PermissionScopeProvider>
    );

    expect(
      scope.allowedWhen([]).matchesWith({ type: "oneOf", permissions: ["any"] })
    ).toBe(false);
  });
});
