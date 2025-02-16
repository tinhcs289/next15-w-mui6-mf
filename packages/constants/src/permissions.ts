import type { PermissionClause } from "@shared/types/auth";

export const ALLOWED_TO_USE = {
  /**
   * @readonly
   */
  FullOfApp: {
    type: "oneOf",
    permissions: [],
  } as PermissionClause,
  SomeFeature: {
    type: "oneOf",
    permissions: [
      "key1",
      "key2",
      {
        type: "matchAll",
        permissions: ["key3", "key4"],
      },
    ],
  } as PermissionClause,
  AnotherFeature: {
    type: "matchAll",
    permissions: ["key5", "key6", "key7"],
  } as PermissionClause,
};
