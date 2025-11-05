export type Permission = {
  id?: string | number;
  key: string;
  name: string;
};

export type PermissionClause = {
  type: "oneOf" | "matchAll";
  permissions: Array<string | PermissionClause>;
};

export type Role = {
  id?: string | number;
  key: string;
  name: string;
  permissions?: Permission[];
};

/**
   * create a `PermissionClause` object in type `matchAll`.
   * use to pass to the `PermissionScope.allowedWhen(...).matchesWith()` function.
   * @example
      const clause = matchAll(
        'xem-chi-tiet-nhiem-vu',
        'van-ban-di-giu-so',
        'van-ban-di-huy-duyet',
        'quan-ly-uy-quyen',
        'van-ban-di-xin-y-kien',
      );
  */
export function matchAll(
  ...permissions: Array<string | PermissionClause>
): PermissionClause {
  return { type: "matchAll", permissions };
}

/**
   * create a `PermissionClause` object in type `oneOf`.
   * use to pass to the `PermissionScope.allowedWhen(...).matchesWith()` function.
   * @example
      const clause = oneOf(
        'xem-chi-tiet-nhiem-vu',
        'van-ban-di-giu-so',
        'van-ban-di-huy-duyet',
        'quan-ly-uy-quyen',
        'van-ban-di-xin-y-kien',
      );
  */
export function oneOf(
  ...permissions: Array<string | PermissionClause>
): PermissionClause {
  return { type: "oneOf", permissions };
}

class ObserverScope {
  private listeners = new Set<() => void>();

  constructor() {}

  __version: number = 0;

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  protected notify(nextVerion?: number) {
    if (typeof nextVerion === "number") {
      this.__version = nextVerion;
    } else {
      this.__version++;
    }
    for (const listener of this.listeners) {
      listener();
    }
  }
}

const DEFAULT_FEATURE: PermissionClause = { type: "oneOf", permissions: [] };

export class PermissionScope extends ObserverScope {
  private userPolicies: Permission[] = [];
  private featureMap: { [featureName: string]: PermissionClause };

  constructor() {
    super();
    this.featureMap = { FullOfApp: DEFAULT_FEATURE };
  }

  setUserPolicies(policies: Permission[]) {
    this.userPolicies = policies;
    this.notify();
  }

  private comparePermissions(
    clause: PermissionClause,
    userPolicies: Permission[]
  ): boolean {
    const userKeys = userPolicies
      .map((p) => p?.key)
      .filter((key): key is string => Boolean(key));

    if (userKeys.length === 0) return false;

    if (
      !clause ||
      (clause.type !== "matchAll" && clause.type !== "oneOf") ||
      !Array.isArray(clause.permissions) ||
      clause.permissions.length === 0
    ) {
      return false;
    }

    const evaluateItem = (item: string | PermissionClause): boolean => {
      if (typeof item === "string") {
        return userKeys.includes(item);
      }
      return this.comparePermissions(item, userPolicies);
    };

    if (clause.type === "matchAll") {
      return clause.permissions.every(evaluateItem);
    }

    if (clause.type === "oneOf") {
      return clause.permissions.some(evaluateItem);
    }

    return false;
  }

  private compareRole(role: Role, userPolicies: Permission[]) {
    const rolePermissions = role.permissions || [];
    const userPermissionKeys = new Set(
      userPolicies.map((p) => p?.key).filter((k): k is string => Boolean(k))
    );
    const rolePermissionKeys = rolePermissions
      .map((p) => p?.key)
      .filter((k): k is string => Boolean(k));

    return rolePermissionKeys.every((key) => userPermissionKeys.has(key));
  }

  /**
   * @example
      const scope = new PermissionScope();
      const clause = scope.getFeaturePermission("create_product");
  */
  getFeaturePermission(featureName: string): PermissionClause | undefined {
    return this.featureMap[featureName];
  }

  /**
   * @example
      const scope = new PermissionScope();
      scope.defineFeature("product_management").matchesWith(
        oneOf("product:create", "product:view", "product:edit", "product:delete")
      );
  */
  defineFeature(featureName: string) {
    return {
      matchesWith: (clause: PermissionClause) => {
        if (this.featureMap.hasOwnProperty(featureName)) {
          console.warn(
            `[PermissionScope] Feature "${featureName}" already exists and will be overwritten.`
          );
        }
        this.featureMap[featureName] = clause;
        this.notify();
      },
    };
  }

  canUseFeature(featureName: string): boolean {
    const clause = this.getFeaturePermission(featureName);
    if (!clause) return false;
    return this.comparePermissions(clause, this.userPolicies);
  }

  allowedWhen(policies?: Permission[]) {
    return {
      /**
       * @example
          const scope = new PermissionScope();
          const isAllowed = scope.allowedWhen(currentUserPolicies).matchesWith(
            oneOf(
              'xem-chi-tiet-nhiem-vu',
              'van-ban-di-giu-so',
              'van-ban-di-huy-duyet',
              'quan-ly-uy-quyen',
              'van-ban-di-xin-y-kien',
              matchAll(
                'nhiem-vu-danh-sach-nhiem-vu-don-vi',
                'van-ban-den-danh-sach-cho-cho-y-kien',
                'cap-nhat-tinh-hinh-thuc-hien',
                oneOf('xem-chi-tiet-nhiem-vu', 'van-ban-di-giu-so')
              )
            )
          );
      */
      matchesWith: (clause: PermissionClause) => {
        return this.comparePermissions(clause, policies || this.userPolicies);
      },
      /**
       * @example
          const scope = new PermissionScope();
          const isAllowed = scope.allowedWhen(currentUserPolicies).matchesWithRole(ADMIN);
      */
      matchesWithRole: (role: Role) => {
        return this.compareRole(role, policies || this.userPolicies);
      },
    };
  }

  resetPermissions() {
    this.userPolicies = [];
    this.notify(0);
  }

  resetFeatureMap() {
    this.featureMap = { FullOfApp: DEFAULT_FEATURE };
    this.notify(0);
  }

  dispose() {
    this.userPolicies = [];
    this.featureMap = { FullOfApp: DEFAULT_FEATURE };
    this.notify(0);
  }
}
