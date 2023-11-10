# WLSS frontend

Frontend application for [Wish List Sharing Service](https://github.com/week-password/wisher). This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.3.

## First time setup

Before setup project you have to install Node.js `v.16.14.0`. If you already have another Node.js version installed, you can use [Node Version Manager](https://github.com/nvm-sh/nvm) to install and switch any Node.js versions you want.

Run `npm install` to install Node.js packages and when it finishes run `npm run start` for starting a development server.

## Development server

Run `ng serve --port=4201` or `npm run start` for a dev server. Navigate to `http://localhost:4201/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

To generate a new module with routing use `ng generate module module-name --routing`

To generate a new component without `.spec.ts` file use `ng generate component component-name --skip-tests=true`

Also you can use shorthand versions of the commands, for expample: `ng g m module-name` for creating module or `ng g c component-name` for creating component.

## Build

Run `ng build` or `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running linter

Run `ng lint` or `npm run lint` to lint code using the Anguar ESLint.

## Deploy

_Only users with write access are able to deploy._

1. Fetch the last version of the `deployed/qa` tag with one of the following commands:
```bash
# using git
git fetch origin +refs/tags/deployed/qa:refs/tags/deployed/qa

# using npm
npm run deploy:qa:fetch
```

2. Checkout to branch/commit you want to deploy.

3. Create and push new version of the `deployed/qa` tag in one of the following ways:
```bash
# using git
git tag --annotate --force deployed/qa --message ''
git push origin deployed/qa --force

# using npm
npm run deploy:qa
```