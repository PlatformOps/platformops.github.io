# PhloxPlanetClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Routing Configuration

1. We have Routing module *app-routing.module.ts* for main Routes under PhloxDb Root module.
2. We have *app-auto-module.ts* and *infra-auto-module.ts*  for adding routes of App-auto and infra-auto modules.
3. We need to import *AppRouting* module to main *AppModule* and *AppAutoRoutingModule* & *InfraAutoRoutingModule* to *AppAutoModule* & *InfraAutoModule* Respectively.
4. Now import *AppAutoModule* and *InfraAutoModule* to main *AppModule*.
5. Now add app-auto related roues to *AppAutoRoutingModule*  and infra-auto modules to *InfraAutoRoutingModule*.
6. "" or base path takes to Home Component, "/app-auto" takes to *AppAutoComponent*, "/infra-auto" takes to *InfraAutoComponent*.
7. Url naming for AppAuto be like "/app-auto/name", and for InfraAuto be like "/infra-auto/name". 

## Shared Configuration

1. We have shared folder for common files usage like shared in root App folder for backend-api.service that has api address for connecting to Api.
2. Use shared folder whenever we have a common file to modules infra-auto or app-auto, or common to whole then use shared under app root folder.