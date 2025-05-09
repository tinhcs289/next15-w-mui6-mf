[< back](../README.md)

# Using environment variables
Multiple `.env.*` files are handle by the tools `env-cmd` and `cross-env` and stored in app as `./apps/[app-name]/.env.[environment-name]`.
<br />
<br />
The environment names should remain the same throughout the apps or packages in the workspaces.
<br />
<br />
There are 4 environments was defined: `.env.localhost`, `.env.development`, `.env.staging` and `.env.production` as default. You can add/remove enviroments or rename them to anything.
<br />
<br />
The commands that are dependent on environment should be executed according to the following syntax

```
pnpm <build|dev|start>:<environment-name>
```

For example:

```
pnpm build:production
```

If you change some environment names, please update all the `turbo.json` files, also the `scripts` section in all the `package.json`.
