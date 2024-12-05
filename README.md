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


## Turborepo structure

#### Apps
- `main`: A [Next.js 15](https://nextjs.org/) app, this is the default app, you can access the default app via the root url "**/**"
- `docs`: Another app in [Next.js 15](https://nextjs.org/) (for example). It should be access from the default app via the url prefix "**/docs/...**" (same as the folder name) and be rewrited in the default app. For example, we use the name **docs** and , you can rename it or add any web application in any typescript framework. You only need to implement the handling for url prefix to make the app work. For NextJS, see [multi-zones](https://nextjs.org/docs/pages/building-your-application/deploying/multi-zones#how-to-define-a-zone)


#### Packages
- `@repo/config-eslint`: This package exports base `eslint` configurations.
- `@repo/constants`: This package exports constant variables and the enums which be used throghout the apps and packages in the workspaces.
- `@repo/types`: This package exports types which be used throghout the apps and packages in the workspaces.
- `@repo/utils`: This package exports utility functions.
- `@repo/share-react`: This package exports UI components shared with all the react applications. You can create another package for the applications which are in a same framework, e.g. **@repo/share-angular**, **@repo/share-vue**, **@repo/share-jquery**, ...

<br />
<br />

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
- [react-hook-form](https://www.react-hook-form.com/) For handling form states and form validation.
- [Material UI v6](https://mui.com/material-ui/getting-started/) UI Framework that implements Google's Material Design.
- [zustand](https://zustand-demo.pmnd.rs/) State management.
- [next-intl](https://next-intl-docs.vercel.app/docs/getting-started) The standard implement of internationalization for Next application.



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
Multiple ```.env.*``` files are handle by the tools ```env-cmd``` and ```cross-env``` and stored in app as ```./apps/[app-name]/.env.[environment-name]```.
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
If you change some environment names, please update all the ```turbo.json``` files, also the ```scripts``` section in all the ```package.json```.

