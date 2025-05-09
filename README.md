# Next 15 Turborepo starter

This is a micro-frontend application using [Next.js 15](https://nextjs.org/) and mono-repo structuring by [Turborepo](https://turbo.build/repo/docs). It follows the [official template by Vercel](https://vercel.com/templates/next.js/microfrontends).

- This Turborepo includes the following packages & apps folder structure.
- Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Packages management

**IMPORTANT**: This Turborepo was implemented follow [pnpm workspace](https://pnpm.io/workspaces) solution, so **PNPM ARE REQUIRED**. Before you can do anything, please install **pnpm** globally by running the following command.

```
npm i -g pnpm
```
## Workspace structure

#### [Apps >](./.readme/README.structure-apps.md)
#### [Components >](./.readme/README.structure-components.md)
#### [Packages >](./.readme/README.structure-packages.md)

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

## [How to run >](./.readme/README.command.md)

## [Using environment variables >](./.readme/README.environments-var.md)

## [Add new application >>](./.readme/README.add-new-app.md)

## [Add new package or component >](./.readme/README.add-new-package.md)
