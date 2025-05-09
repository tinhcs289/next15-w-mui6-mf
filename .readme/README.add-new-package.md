[< back](../README.md)

# Add new package or component project

### Step 1: Create a new directory within `packages` or `components` directory
the structure of the directory should be like the one below:
``` bash
├── src
│   ├── ...
│   └── index.ts
├── eslint.config
├── package.json
├── tsconfig.json
├── tsup.config.json
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
    "incremental": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
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
    "sourceMap": true,
    "strict": true,
    "target": "ESNext",
    "tsBuildInfoFile": "node_modules/.cache/tsbuildinfo.json"
  },
  "exclude": ["node_modules", "**/*.stories.tsx", "dist"],
  "include": ["src"]
}

```
content of `tsup.config.json` file:
``` json
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/*/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  splitting: true,
})
```
content of `package.json` file:
``` json
{
  "name": "@shared/<same-as-the-directory-name>",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "exports": {
    "./*": "./src/*/index.ts"
  },
  "typesVersions": {
    "*": {
      "*": [
        "./src/*/index.ts"
      ]
    }
  },
  "scripts": {
    "clean": "rm -rf dist && rm -rf .turbo && rm -rf node_modules",
    "build": "tsup \"src/index.ts\" --format esm,cjs --dts --sourcemap --external react",
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
