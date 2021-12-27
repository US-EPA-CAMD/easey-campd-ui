# `EPA CAMD EASEY CAMPD UI`

[![GitHub](https://img.shields.io/github/license/US-EPA-CAMD/easey-campd-ui)](https://github.com/US-EPA-CAMD/easey-campd-ui/blob/develop/LICENSE)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=US-EPA-CAMD_easey-campd-ui&metric=alert_status)](https://sonarcloud.io/dashboard?id=US-EPA-CAMD_easey-campd-ui)
[![Develop Branch Pipeline](https://github.com/US-EPA-CAMD/easey-campd-ui/workflows/Develop%20Branch%20Workflow/badge.svg)](https://github.com/US-EPA-CAMD/easey-campd-ui/actions)<br>
CAMPD UI for the EPA CAMD Business Systems EASEY Application

## `Available Scripts`

From within the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />

- Open [http://localhost:3000](http://localhost:3000) to view Home page.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Environment Variables

Environment variables need to be prefixed by REACT*APP* in order for the variables to be accessible on the process.env object in JavaScript.

### Specifying Environments

Create React App does not allow to change the value of the NODE_ENV environment variable. The npm start command will set the NODE_ENV to development, the npm test command will set the NODE_ENV to test, and the npm run build command sets the NODE_ENV to production.

Given that the NODE_ENV is set for you and that the value for NODE_ENV is used to reconcile the correct .env file, the following .env files can be used:

- .env
- .env.local (loaded for all environments except test)
- .env.development, .env.test, .env.production
- .env.development.local, .env.test.local, .env.production.local

### Order of priority/inheritance

The order of priority and inheritance is exactly the same as that described for the parcel bundler:

- .env.${NODE_ENV}.local
- .env.${NODE_ENV}
- .env.local
- .env

### Additional environments

To use environment variables for environments other than development, test, and production, you can create additional .env files and load the correct .env file using env-cmd.

To take a staging environment as an example:

- Create a .env.staging file and add environment variables to the file
- Add env-cmd as a project dependency (npm install env-cmd --save)
- Create script commands for the staging environment
- Run the start:staging or build:staging command to start a local staging environment or
  to build the staging environment bundle

It's important to note that the NODE_ENV will still be set to development when running the npm start command and the NODE_ENV will be set to production when running the npm run build command, so environment variables can still be loaded from either .env.development or .env.production depending on the command used.

For example, running the start:staging command from above would load environment variables from the following files (in order of priority):

- .env.staging
- .env.development.local
- .env.development
- .env.local
- .env

[JavaScript environment variables reference](https://www.robertcooper.me/front-end-javascript-environment-variables)

## License & Contributing

​
This project is licensed under the MIT License. We encourage you to read this project’s [License](https://github.com/US-EPA-CAMD/devops/blob/master/LICENSE), [Contributing Guidelines](https://github.com/US-EPA-CAMD/devops/blob/master/CONTRIBUTING.md), and [Code of Conduct](https://github.com/US-EPA-CAMD/devops/blob/master/CODE_OF_CONDUCT.md).

## Disclaimer
The United States Environmental Protection Agency (EPA) GitHub project code is provided on an "as is" basis and the user assumes responsibility for its use. EPA has relinquished control of the information and no longer has responsibility to protect the integrity , confidentiality, or availability of the information. Any reference to specific commercial products, processes, or services by service mark, trademark, manufacturer, or otherwise, does not constitute or imply their endorsement, recommendation or favoring by EPA. The EPA seal and logo shall not be used in any manner to imply endorsement of any commercial product or activity by EPA or the United States Government.
