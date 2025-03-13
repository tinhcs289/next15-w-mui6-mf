import type { PermissionClause } from "../types";

type FeatureMap = { [featureName: string]: PermissionClause };

export const FEATURE_MAP: FeatureMap = {
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


export function defineFeaturePermisson(featureName: string, permissionClause: PermissionClause) {
  FEATURE_MAP[featureName] = permissionClause;
}