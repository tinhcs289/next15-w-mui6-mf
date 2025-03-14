[< back](../../README.md)

# Authentication and Authorization
This package exports utility functions, hooks and React components for authentcation and authorization.

## Authentication with JWT token
JWT token which received from the authencation API service will be store in both the browser `local storage` and the `cookies storage`.
#### Why do we use both `local storage` and `cookies storage`?
- `cookies storage` can synchronize up with the server side. In most of case, we should access the auth data from this storage.
- `local storage` can trigger event when the change occurs, so it is only used for state synchronizing between multple browser tabs.
- The auth data at these storages are the same.

## The package includes
- General types of authenticate and authorization data
- [`The auth states context`](./README.auth-context.md)
- [`The tools for authorization`](./README.permission.md)