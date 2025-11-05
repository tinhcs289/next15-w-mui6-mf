import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Permission, Role } from "./permission-scope";
import { PermissionScope, matchAll, oneOf } from "./permission-scope";

describe("PermissionScope", () => {
  let scope: PermissionScope;
  let userPolicies: Permission[];

  const createUserPolicies = (): Permission[] => [
    { key: "view_product", name: "View Product" },
    { key: "edit_product", name: "Edit Product" },
    { key: "delete_product", name: "Delete Product" },
  ];

  beforeEach(() => {
    scope = new PermissionScope();
    userPolicies = createUserPolicies();
    scope.setUserPolicies(userPolicies);
  });

  it("matchAll - returns true when user has all permissions", () => {
    const clause = matchAll("view_product", "edit_product");
    expect(scope.allowedWhen().matchesWith(clause)).toBe(true);
  });

  it("matchAll - returns false if user is missing any permission", () => {
    const clause = matchAll("view_product", "non_existent_permission");
    expect(scope.allowedWhen().matchesWith(clause)).toBe(false);
  });

  it("oneOf - returns true if user has at least one permission", () => {
    const clause = oneOf("non_existent", "edit_product");
    expect(scope.allowedWhen().matchesWith(clause)).toBe(true);
  });

  it("oneOf - returns false if user has none of the permissions", () => {
    const clause = oneOf("non_existent_1", "non_existent_2");
    expect(scope.allowedWhen().matchesWith(clause)).toBe(false);
  });

  it("nested clause - oneOf inside matchAll - returns true", () => {
    const clause = matchAll(
      "view_product",
      oneOf("edit_product", "non_existent")
    );
    expect(scope.allowedWhen().matchesWith(clause)).toBe(true);
  });

  it("nested clause - oneOf inside matchAll - returns false", () => {
    const clause = matchAll(
      "view_product",
      oneOf("non_existent_1", "non_existent_2")
    );
    expect(scope.allowedWhen().matchesWith(clause)).toBe(false);
  });

  it("matchesWithRole - returns true when user has all role permissions", () => {
    const role: Role = {
      key: "admin",
      name: "Administrator",
      permissions: [
        { key: "view_product", name: "" },
        { key: "edit_product", name: "" },
      ],
    };

    expect(scope.allowedWhen().matchesWithRole(role)).toBe(true);
  });

  it("matchesWithRole - returns false when user is missing any role permission", () => {
    const role: Role = {
      key: "limited",
      name: "Limited",
      permissions: [
        { key: "view_product", name: "" },
        { key: "edit_product", name: "" },
        { key: "manage_users", name: "" },
      ],
    };

    expect(scope.allowedWhen().matchesWithRole(role)).toBe(false);
  });

  it("defineFeature and canUseFeature - returns true when clause is matched", () => {
    const versionBefore = scope.__version;
    scope
      .defineFeature("product_management")
      .matchesWith(matchAll("view_product", "edit_product"));

    expect(scope.__version).toBeGreaterThan(versionBefore);
    expect(scope.canUseFeature("product_management")).toBe(true);
  });

  it("canUseFeature - returns false for undefined features", () => {
    expect(scope.canUseFeature("non_existent_feature")).toBe(false);
  });

  it("resetPermissions - clears user permissions", () => {
    scope.resetPermissions();
    expect(scope.__version).toBe(0);
    const clause = oneOf("view_product");
    expect(scope.allowedWhen().matchesWith(clause)).toBe(false);
  });

  it("dispose - resets all internal state", () => {
    scope.defineFeature("abc").matchesWith(oneOf("view_product"));
    scope.dispose();

    expect(scope.__version).toBe(0);
    expect(scope.canUseFeature("abc")).toBe(false);
    expect(scope.allowedWhen().matchesWith(oneOf("view_product"))).toBe(false);
  });

  it("subscribe and notify - triggers listeners when userPolicies change", () => {
    const fn = vi.fn();
    const versionBefore = scope.__version;

    scope.subscribe(fn);
    scope.setUserPolicies([
      { key: "another_permission", name: "Another Permission" },
    ]);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(scope.__version).toBeGreaterThan(versionBefore);
  });

  it("defineFeature - triggers listeners when featureMap change", () => {
    const fn = vi.fn();
    const versionBefore = scope.__version;

    scope.subscribe(fn);
    scope.defineFeature("product_feature").matchesWith(oneOf("view_product"));

    expect(fn).toHaveBeenCalledTimes(1);
    expect(scope.__version).toBeGreaterThan(versionBefore);
  });

  it("defineFeature warns when overwriting existing feature", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    scope.defineFeature("duplicate_feature").matchesWith(oneOf("view_product"));
    scope.defineFeature("duplicate_feature").matchesWith(oneOf("edit_product"));

    expect(spy).toHaveBeenCalledWith(
      '[PermissionScope] Feature "duplicate_feature" already exists and will be overwritten.'
    );
    spy.mockRestore();
  });

  it("matchesWith - returns false for invalid or empty clauses", () => {
    // @ts-expect-error: intentionally malformed input
    expect(scope.allowedWhen().matchesWith({})).toBe(false);
    expect(
      // @ts-expect-error: intentionally malformed input
      scope.allowedWhen().matchesWith({ type: "invalid", permissions: [] })
    ).toBe(false);
    expect(scope.allowedWhen().matchesWith(null as any)).toBe(false);
  });

  it("deeply nested matchAll and oneOf - returns true", () => {
    const clause = matchAll(
      "view_product",
      oneOf(
        "non_existent",
        matchAll("edit_product", oneOf("delete_product", "non_existent"))
      )
    );

    expect(scope.allowedWhen().matchesWith(clause)).toBe(true);
  });

  it("deeply nested matchAll and oneOf - returns false", () => {
    const clause = matchAll(
      "view_product",
      oneOf(
        "non_existent",
        matchAll("edit_product", oneOf("non_existent_1", "non_existent_2"))
      )
    );

    expect(scope.allowedWhen().matchesWith(clause)).toBe(false);
  });

  it("multiple nested oneOf inside matchAll - returns true", () => {
    const clause = matchAll(
      oneOf("view_product", "non_existent_1"),
      oneOf("edit_product", "non_existent_2"),
      oneOf("delete_product", "non_existent_3")
    );

    expect(scope.allowedWhen().matchesWith(clause)).toBe(true);
  });

  it("multiple nested oneOf inside matchAll - returns false", () => {
    const clause = matchAll(
      oneOf("view_product", "non_existent_1"),
      oneOf("edit_product", "non_existent_2"),
      oneOf("non_existent_3", "non_existent_4")
    );

    expect(scope.allowedWhen().matchesWith(clause)).toBe(false);
  });

  it("deeply nested mixed clauses - returns true", () => {
    const clause = oneOf(
      "non_existent",
      matchAll(
        "view_product",
        oneOf("edit_product", "non_existent"),
        matchAll("delete_product")
      )
    );

    expect(scope.allowedWhen().matchesWith(clause)).toBe(true);
  });

  it("deeply nested mixed clauses - returns false", () => {
    const clause = oneOf(
      "non_existent",
      matchAll(
        "view_product",
        oneOf("non_existent_1", "non_existent_2"),
        matchAll("delete_product")
      )
    );

    expect(scope.allowedWhen().matchesWith(clause)).toBe(false);
  });
});
