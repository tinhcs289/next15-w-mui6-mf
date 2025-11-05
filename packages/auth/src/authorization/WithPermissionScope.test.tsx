import { act, render, screen, waitFor } from "@testing-library/react";
import type { JSX } from "react";
import { describe, expect, it } from "vitest";
import type { UsePermissionScope } from "./context";
import { PermissionScopeProvider, usePermissionScope } from "./context";
import DefineFeature from "./DefineFeature";
import InitializePermissions from "./InitializePermissions";
import WithPermissionScope from "./WithPermissionScope";

describe("WithPermissionScope", () => {
  it("renders children when permission is granted", async () => {
    const TestChild = () => <div>Allowed</div>;
    let scopeRef = null as unknown as UsePermissionScope;
    const ScopeConsumer = () => {
      scopeRef = usePermissionScope();
      return null as unknown as JSX.Element;
    };

    render(
      <PermissionScopeProvider>
        <InitializePermissions
          permissions={[{ key: "view_product", name: "View Product" }]}
        />
        <DefineFeature
          name="product_management"
          matchesWith={{ type: "oneOf", permissions: ["view_product"] }}
        />
        <ScopeConsumer />
        <WithPermissionScope allowFor="product_management">
          <TestChild />
        </WithPermissionScope>
      </PermissionScopeProvider>
    );

    await waitFor(() => {
      if (!scopeRef) throw new Error("Scope not ready");
      expect(scopeRef.canUseFeature("product_management")).toBe(true);
    });

    expect(screen.getByText("Allowed")).toBeInTheDocument();
  });

  it("renders fallback when permission is denied", async () => {
    const Fallback = () => <div>Denied</div>;
    const TestChild = () => <div>Allowed</div>;
    let scopeRef = null as unknown as UsePermissionScope;
    const ScopeConsumer = () => {
      scopeRef = usePermissionScope();
      return null as unknown as JSX.Element;
    };

    act(() => {
      render(
        <PermissionScopeProvider>
          <InitializePermissions permissions={[]} />
          <DefineFeature
            name="product_management"
            matchesWith={{ type: "oneOf", permissions: ["view_product"] }}
          />
          <ScopeConsumer />
          <WithPermissionScope
            allowFor="product_management"
            fallback={Fallback}
          >
            <TestChild />
          </WithPermissionScope>
        </PermissionScopeProvider>
      );
    });

    await waitFor(() => {
      if (!scopeRef) throw new Error("Scope not ready");
      expect(scopeRef.canUseFeature("product_management")).toBe(false);
    });

    expect(screen.queryByText("Denied")).toBeInTheDocument();
    expect(screen.queryByText("Allowed")).not.toBeInTheDocument();
  });

  it("renders nothing when permission is denied and no fallback provided", async () => {
    const TestChild = () => <div>Allowed</div>;
    let scopeRef = null as unknown as UsePermissionScope;
    const ScopeConsumer = () => {
      scopeRef = usePermissionScope();
      return null as unknown as JSX.Element;
    };

    act(() => {
      render(
        <PermissionScopeProvider>
          <InitializePermissions permissions={[]} />
          <DefineFeature
            name="product_management"
            matchesWith={{ type: "oneOf", permissions: ["view_product"] }}
          />
          <ScopeConsumer />
          <WithPermissionScope allowFor="product_management">
            <TestChild />
          </WithPermissionScope>
        </PermissionScopeProvider>
      );
    });

    await waitFor(() => {
      if (!scopeRef) throw new Error("Scope not ready");
      expect(scopeRef.canUseFeature("product_management")).toBe(false);
    });

    expect(screen.queryByText("Allowed")).not.toBeInTheDocument();
  });
});
