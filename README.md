# Apollo React Components

This is a monorepo for the development of reusable react components based on EDS.

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `playground`: a Vite.js React app for testing components
- `ui`: a stub React component library
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Husky](https://typicode.github.io/husky/#/) for git hooks

### Build

To build all apps and packages, run the following command:

```
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
yarn run dev
```

To use the local dev package version in other projects, make point to the local project instead of the version number in the `package.json` in the depending project.

```
+  "@equinor/apollo-components": "link:./../apollo-react-components/packages/apollo-components",
-  "@equinor/apollo-components": "^1.5.0",
```

### Publish

Packages are published through the CI system using [Changesets](https://github.com/changesets/changesets). A changeset contains a description of changes for each package, as well as the semantic version in crease (major.minor.patch).

When changesets are merged into main, a PR is created to publish the NPM packages and update the changelog.

An NPM_TOKEN is required to publish packages to the registry, and is tied to a specific user.
To setup NPM publishing do the following:

1. Apply to be a member of the @Equinor organization on NPM.
2. Create an Access Token. It should be "Classic Token with Publish permissions.
3. Copy the token as a repository secret.

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
