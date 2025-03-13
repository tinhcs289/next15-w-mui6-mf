# Next 15 Turborepo starter

This is a micro-frontend application using [Next.js 15](https://nextjs.org/) and mono-repo structuring by [Turborepo](https://turbo.build/repo/docs). It follows the [official template by Vercel](https://vercel.com/templates/next.js/microfrontends).

- This Turborepo includes the following packages & apps folder structure.
- Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

<br />
<br />

## Packages management

**IMPORTANT**: This Turborepo was implemented follow [pnpm workspace](https://pnpm.io/workspaces) solution, so **PNPM ARE REQUIRED**. Before you can do anything, please install **pnpm** globally by running the following command.

```
npm i -g pnpm
```

<br />
<br />

## Workspace structure

#### Apps
Next [multi-zones](https://nextjs.org/docs/pages/building-your-application/deploying/multi-zones#how-to-define-a-zone) applications
- `main`: A [Next](https://nextjs.org/) app, this is the default app, you can access the default app via the root url "**/**".
- `admin`: A [Next](https://nextjs.org/) app, this is the admin site, you can access the default app via the root url "**/admin/**".
- ...
- `[...whatever-path]`: others micro [Next](https://nextjs.org/) app. It should be access from the `main` app via the url prefix "**/[...whatever-path]/...**" (same as its folder name) and be rewrited in the `main` app.

#### Components
- `@shared/layouts`: This package exports utility functions, hooks, and React components for layouts based on `@mui/material`.
- `@shared/providers`: This package exports React provider components for global contexts such as: Date-time and numeric format, theme context, zustand store, react-query.
- `@shared/typo`: This package exports React components for typography based on `@mui/material/Typography`.
- `@shared/boxes`: This package exports React utility components for based on `@mui/material/Box`.
- `@shared/buttons`: This package exports React components for various types of button based on `@mui/material/Button`.
- `@shared/form`: This package exports utility functions, hooks, and React components for form handling and data entries based on `react-hook-form` and `@mui/material`.
- `@shared/dialog`: This package exports React components for dialog display based on `@mui/material/Dialog`.
- `@shared/data-table`: This package exports utility functions, hooks, and React components for data-table handling based on `@mui/material/Table`, `react-virtuoso` and `@dnd-kit`.
- `@shared/paginations`: This package exports React components for various types of pagination based on `@mui/material`.
- `@shared/paginated-list`: This package exports React components and hooks to control the dynamic data list.
- `@shared/svg`: This package exports SVG components.

#### Packages
- `@shared/animate-on-scroll`: This package exports base initializer functions for handling animations on scroll based on `aos`.
- `@shared/auth`: This package exports utility functions, hooks and React components for `authentcation` and `authorization`.
- `@shared/browser-storage`: This package exports  functions for handling local-storage and cookies in the client side.
- `@shared/config-eslint`: This package exports base `eslint` configurations.
- `@shared/constants`: This package exports constant variables and the enums which be used throghout the apps and packages in the workspaces.
- `@shared/http-client`: This package exports  functions for performing XMLHttpRequest based on `axios`.
- `@shared/navigation`: This package exports utility functions, hooks, and React components for navigation based on `next/navigation` and `next-intl`.
- `@shared/stack-next-middleware`: This package exports utility functions for handling factory the middleware for next app.
- [`@shared/states-context`](./packages/states-context/README.md): This package exports a tool for states managenent based on the `Context API`.
- `@shared/types`: This package exports types which be used throghout the apps and packages in the workspaces.
- `@shared/use-watch-element-dimensions`: This package exports a hook function which can watch the dimensions of a HTML element.
- `@shared/utils`: This package exports utility functions in typscript.
- [`@shared/zustand-context`](./packages/zustand-context/README.md): This package exports a mixed of `zustand` and `Context API` for handling multiple instances of store.



## Pre-added

This turborepo has some additional tools and libraries already setup for you:

### Formatting tools

- [TypeScript](https://www.typescriptlang.org/) for static type checking.
- [ESLint](https://eslint.org/) for code linting.
- [Prettier](https://prettier.io) for code formatting.

### Typescript libraries

- [lodash](https://lodash.com/) For handling array, object, function, collection and more.
- [moment](https://momentjs.com/) For handling dates and times data.
- [numeral](http://numeraljs.com/) For formatting and manipulating numbers.
- [axios](https://axios-http.com/) Promise based HTTP client for the browser and node.js.
- [yup](https://www.npmjs.com/package/yup) Schema builder for runtime value parsing and validation.
- [qs](https://github.com/ljharb/qs) Querystring parsing and stringifying.
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) for handling JSON Web Tokens.
- [js-cookie](https://github.com/js-cookie/js-cookie#readme) For handling cookie.
- [crypto-js](https://github.com/brix/crypto-js) For handling encrypt or decrypt data.

### React/Next libraries

- [@uidotdev/usehooks](https://usehooks.com/) common useful react hooks functions.
- [@mui/material](https://mui.com/material-ui/getting-started/) UI Framework 
- [react-hook-form](https://www.react-hook-form.com/) For handling form states and form validation.
that implements Google's Material Design.
- [zustand](https://zustand-demo.pmnd.rs/) State management.
- [next-intl](https://next-intl-docs.vercel.app/docs/getting-started) The standard implement of internationalization for Next application.
- [@dnd-kit](https://docs.dndkit.com/) for hanling the drag-and-drop behavior.
- [react-virtuoso](https://virtuoso.dev/) for displaying large data sets using virtualized rendering
<br />
<br />

## How to run

### Install

To install all apps and packages, run the following command **from the root directory**.

```
pnpm install
```

### Build

To build all apps and packages, run the following command **from the root directory**.

```
pnpm build
```

### Develop

To develop all apps and packages, run the following command **from the root directory**.

```
pnpm dev
```

### Clean

To clean all built files and installed node modules, run the following command **from the root directory**.

```
pnpm clean
```

### Using environment variables

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

<br />
<br />

## Add new application

### Step 1: Create a new directory within `apps` directory

the name of the folder and the prefix path of the application should be the same.

### Step 2: Create `turbo.json` file

create a `turbo.json` file within application's folder. The file should include the `build`, `dev` and `start` commands. the number of variants of each command depends on the enviroments.

### Step 3: Define scripts in `package.json` file

in the `scripts` section in the `package.json`, you need to defined `build`, `dev`, `start` and `clean` scripts at least.

### Step 4: Config multi-zones

add a new key into .env.\* files `main` application. you can find these file in `apps/main/env/...` folder.
<br />
The name of key should follow the convention below:
<br />
`NEXT_PUBLIC_ZONE_<UNIQUE-NUMBER>`.
<br />
The value of the key should follow the convention below:
<br />
``` javascript
`"{\"name\":\"<name-of-zone>\",\"domain\":\"<domain-of-zone>\"}"`
```
<br />
<br />
For example:

``` json
NEXT_PUBLIC_ZONE_4="{\"name\":\"admin\",\"domain\":\"http://localhost:9002\"}"
```

<br />
<br />

## Add new package/component

### Step 1: Create a new directory within `packages` or `components` directory
the structure of the directory should be like the one below:
``` bash
├── src
│   ├── ...
│   └── index.ts
├── eslint.config
├── package.json
├── tsconfig.json
└── turbo.json
```
content of `eslint.config` file:
``` javascript
import { esLintConfigBase as config } from "@shared/config-eslint/base";

/** @type {import("eslint").Linter.Config} */
export default config;
```
content of `tsconfig.json` file:
``` json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "allowJs": true,
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "react-jsx",
    "incremental": true,
    "isolatedModules": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext", "ESNext.Array"],
    "module": "ESNext",
    "moduleDetection": "force",
    "moduleResolution": "bundler",
    "noUncheckedIndexedAccess": true,
    "outDir": "dist",
    "paths": {
      "@/*": ["./src/*"]
    },
    "resolveJsonModule": true,
    "rootDir": "src",
    "skipLibCheck": true,
    "strict": true,
    "target": "ESNext",
    "tsBuildInfoFile": "node_modules/.cache/tsbuildinfo.json"
  },
  "exclude": ["node_modules", "**/*.stories.tsx", "dist"],
  "include": ["src"]
}
```
content of `package.json` file:
``` json
{
  "name": "@shared/<same-as-the-directory-name>",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "exports": {
    ...
    ".": "./src/index.ts"
   
  },
  "typesVersions": {
    "*": {
      ...
      "*": [
        "./src/index.ts"
      ]
    }
  },
  "scripts": {
    "clean": "rm -rf dist && rm -rf .turbo && rm -rf node_modules",
    "build": "tsup \"src/index.ts\" --format esm,cjs --dts --external react",
    "lint": "TIMING=1 eslint \"**/*.{ts,tsx,js,jsx}\" --fix",
    "generate:component": "turbo gen react-component",
    "check-types": "tsc --noEmit"
  },
  "dependencies": {
    ...
  },
  "devDependencies": {
    ...
    "@shared/config-eslint": "workspace:*",
    "tsup": "8.4.0",
    "typescript": "5.8.2"
  }
}
```
content of the `turbo.json` file
``` json
{
  "extends": ["//"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"]
    },
    "build:development": {
      "dependsOn": ["^build"]
    },
    "build:staging": {
      "dependsOn": ["^build"]
    },
    "build:production": {
      "dependsOn": ["^build"]
    }
  }
}
```
### Step 2: edit the `turbo.json` file
The basic content of `turbo.json` can work well, you can also edit to meet your expectation and it should contains `build` task at least. The variants of each task depends on the enviroments.

### Step 3: define scripts in `package.json` file
in the `scripts` section in the `package.json`, you need to defined `build` and `clean` scripts at least.

### Step 4: start your code
start your code within the `src` folder.

### Final step: Export whatever you want
please defined `exports` in the `package.json` file.
