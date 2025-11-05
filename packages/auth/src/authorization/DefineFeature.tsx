"use client";

import type { ComponentType } from "react";
import { memo, useEffect, useRef } from "react";
import { usePermissionScope } from "./context";
import { PermissionClause } from "./permission-scope";

export type DefineFeatureProps = {
  name: string;
  matchesWith: PermissionClause;
};

const DefineFeature = memo(
  ({ name, matchesWith }: DefineFeatureProps) => {
    const scope = usePermissionScope();
    const initialized = useRef(false);

    useEffect(() => {
      if (!name || !scope || !matchesWith) return;
      if (initialized.current) return;
      scope.defineFeature(name).matchesWith(matchesWith);
      initialized.current = true;
    }, [name, scope, matchesWith]);

    return null;
  }
) as ComponentType<DefineFeatureProps>;
DefineFeature.displayName = "DefineFeature";

export default DefineFeature;