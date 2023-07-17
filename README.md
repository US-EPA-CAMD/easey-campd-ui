# Clean Air Markets Program Data (CAMPD) Application`

[![License](https://img.shields.io/github/license/US-EPA-CAMD/easey-campd-ui)](https://github.com/US-EPA-CAMD/easey-campd-ui/blob/develop/LICENSE)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=US-EPA-CAMD_easey-campd-ui&metric=alert_status)](https://sonarcloud.io/dashboard?id=US-EPA-CAMD_easey-campd-ui)
[![Develop CI/CD](https://github.com/US-EPA-CAMD/easey-campd-ui/workflows/Develop%20Branch%20Workflow/badge.svg)](https://github.com/US-EPA-CAMD/easey-campd-ui/actions)
[![Release CI/CD](https://github.com/US-EPA-CAMD/easey-campd-ui/workflows/Release%20Branch%20Workflow/badge.svg)](https://github.com/US-EPA-CAMD/easey-campd-ui/actions)
![Issues](https://img.shields.io/github/issues/US-EPA-CAMD/easey-campd-ui)
![Forks](https://img.shields.io/github/forks/US-EPA-CAMD/easey-campd-ui)
![Stars](https://img.shields.io/github/stars/US-EPA-CAMD/easey-campd-ui)
[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/US-EPA-CAMD/easey-campd-ui)

## Description
The Clean Air Markets Program Data (CAMPD) application is a publicly accessible website that provides users the ability to create customized queries to retrieve emissions, allowance, & compliance data as well as download bulk datasets submitted to the EPA by industry power plant facilities.

## Getting Started
Follow these [instructions](https://github.com/US-EPA-CAMD/devops/blob/master/GETTING-STARTED.md) to get the project up and running correctly.

## Installing
1. Open a terminal and navigate to the directory where you wish to store the repository.
2. Clone the repository using one of the following git cli commands or using your favorit Git management software<br>
    **Using SSH**
    ```
    $ git clone git@github.com:US-EPA-CAMD/easey-campd-ui.git
    ```
    **Using HTTPS**
    ```
    $ git clone https://github.com/US-EPA-CAMD/easey-campd-ui.git
    ```
3. Navigate to the projects root directory
    ```
    $ cd easey-campd-ui
    ```
4. Install package dependencies
    ```
    $ yarn install --ignore-engines
    ```

## Building, Testing, & Running the application
From within the projects root directory run the following commands using the yarn command line interface

**Run in development mode**
```
$ yarn start:dev
```

**Install/update package dependencies & run in development mode**
```
$ yarn up
```

**Unit tests**
```
$ yarn test
```

**Build**
```
$ yarn build
```

**Run in production mode**
```
$ yarn start
```

## Environment Variables
Environment variables need to be prefixed by REACT_APP in order for the variables to be accessible on the window._env_ object in JavaScript.
Environment Variable instructions found [here](https://github.com/US-EPA-CAMD/devops/blob/master/ENV_INSTRUCTIONS.md).

## License & Contributing
This project is licensed under the MIT License. We encourage you to read this project’s [License](https://github.com/US-EPA-CAMD/devops/blob/master/LICENSE), [Contributing Guidelines](https://github.com/US-EPA-CAMD/devops/blob/master/CONTRIBUTING.md), and [Code of Conduct](https://github.com/US-EPA-CAMD/devops/blob/master/CODE_OF_CONDUCT.md).

## Disclaimer
The United States Environmental Protection Agency (EPA) GitHub project code is provided on an "as is" basis and the user assumes responsibility for its use. EPA has relinquished control of the information and no longer has responsibility to protect the integrity , confidentiality, or availability of the information. Any reference to specific commercial products, processes, or services by service mark, trademark, manufacturer, or otherwise, does not constitute or imply their endorsement, recommendation or favoring by EPA. The EPA seal and logo shall not be used in any manner to imply endorsement of any commercial product or activity by EPA or the United States Government.
