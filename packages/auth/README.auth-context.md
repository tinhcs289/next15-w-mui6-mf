[< back](./README.md)

# The auth states context
The context of auth was contains states of `auth data`, user `roles` and `permissions`.
<br />
It was created with the tool from [`@shared/states-context`](../states-context/README.md) and It will only work with CLIENT COMPONENTS

## Wrap the components inside the provider

``` typescript
import { AuthStatesProvider } from "@shared/auth";
```
First, wrap all the components or view which can reach the the auth data by the `AuthStatesProvider` component.
``` typescript
<AuthStatesProvider>
// you view go here
</AuthStatesProvider>
```
## The type of states in the context
``` typescript
type AuthStates = {
  auth?: AuthData | null;
  saveAuthToStore?: (data?: AuthData) => void;
  roles?: Roles[] | null;
  saveRolesToStore?: (data?: Roles[]) => void;
  permissions?: Permission[] | null;
  savePermissionsToStore?: (data?: Permission[]) => void;
}
```
- `auth`: the auth data in the type `AuthData` that contains the infomation of authentication token.
- `saveAuthToStore`: the callback function for general use that you update the auth data in the context from anywhere inside the provider.
- `roles`: an array of `Role` object that contains the infomation of user roles.
- `saveRolesToStore`: the callback function for general use that you update the roles data in the context from anywhere inside the provider.
- `permissions`: an array of `Permission` that contains the infomation of user permissions.
- `savePermissionsToStore`: the callback function for general use that you update the permissions data in the context from anywhere inside the provider.

## Getting the value of the states
``` typescript
const authdata = useGetAuthState((s) => s?.auth);
```
``` typescript
const roles = useGetAuthState((s) => s?.roles);
```
``` typescript
const permissions = useGetAuthState((s) => s?.permissions);
```
``` typescript
const saveAuthToStore = useGetAuthState((s) => s?.saveAuthToStore);
```

## Updating the value of the states
``` typescript
const saveAuthToStore = useGetAuthState((s) => s?.saveAuthToStore);
// ...
saveAuthToStore?.(newAuthData);
```
``` typescript
const saveRolesToStore = useGetAuthState((s) => s?.saveRolesToStore);
// ...
saveRolesToStore?.(newRolesData);
```
``` typescript
const savePermissionsToStore = useGetAuthState((s) => s?.savePermissionsToStore);
// ...
savePermissionsToStore?.(newPermissionsData);
```