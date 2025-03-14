[< back](./README.md)

# The tools for authorization
This is the way for hanlding `roles` and `permissions`.

## The feature map
This is a object that contains all the features of the application, each feature corresponds to a property of the object and its value is a clause of permissions.
``` typescript
const FEATURE_MAP = {
  FullOfApp: {
    type: "oneOf",
    permissions: [],
  },
  Feature1: {
    type: "oneOf",
    permissions: [
      "permission-key-1",
      "permission-key-2",
      {
        type: "matchAll",
        permissions: [
          "permission-key-3", 
          "permission-key-4",
        ],
      },
    ],
  },
  Feature2: {
    type: "matchAll",
    permissions: [
      "permission-key-5",
      "permission-key-6",
      "permission-key-7",
    ],
  },
  ...
}
```
You can extend this object depending on the features of your application by using the function `defineFeaturePermisson`
``` typescript
import { defineFeaturePermisson } from "@shared/auth";
```
``` typescript
defineFeaturePermisson(
  "Feature3",
  {
    type: "matchAll",
    permissions: [
      "permission-key-5",
      "permission-key-6",
      "permission-key-7",
    ],
  }
)
```

## The clause of permission
Each feature in the application will come with a permission clause. This clause is a model of conditions, if the user's permission list meets these conditions, the user will be allowed to use the feature.
<br />
#### There are 02 types of conditions:
- `matchAll`: the user's permission list must **CONTAIN ALL** the permission keys of in the clause.
- `oneOf`: the user's permission list need **CONTAIN AT LEAST ONE** of the permission keys of in the clause.
#### The keys of permission
This is a list of permission values. But in case you want to combine conditions, you can push a permission clause to the list.

## The hook function for authorization
``` typescript
import { usePermissions } from "@shared/auth";
```
use this to know the current use can perform a feature or not
``` typescript
const { isAllowed } = usePermissions("Feature1")
```

## The component for authorization
``` typescript
import { WithPermissions } from "@shared/auth";
```
use this to know the current use can perform a feature or not
``` typescript
<WithPermissions
  allowTo="Feature1"
  fallback={FallbackWhenUserIsNotAllowedToPerformFeature1}
>
 // view of Feature1
<WithPermissions>
```

## Custom rules of authorization
If there is some advance condition of authorization that do not follow the feature map, or If you need check authorization from outside of the closure of component tree, You can you these functions to build the condition:
``` typescript
import { isAllowedIf, matchAll, oneOf } from "@shared/auth";
```
``` typescript
const isAllowed = isAllowedIf(currentUserPolicies).matchesWith(
  oneOf(
      "permission-key-1",
      "permission-key-2",
      "permission-key-3",
      matchAll(
      "permission-key-4",
      "permission-key-5",
      oneOf(
        "permission-key-6",
        "permission-key-7",
      )
    )
  )
);
```