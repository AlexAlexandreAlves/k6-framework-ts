# k6 REST Test Framework

This project provides a modular architecture for REST API testing using [k6](https://k6.io/). It helps organize test scenarios, input data, and reporting in a scalable and maintainable way.

## Folder Structure

```
calendar-date-automation-test
├── src
│   ├── config/              
│   ├── constants/
│   ├── core/
│   │   └── request-rest-base.js
│   ├── json-objects/
│   │   ├── activities/
│   │   └── authors/
│   ├── requests/
│   │   ├── activities/
│   │   └── authors/
│   ├── resources
│   │   ├── csv/
│   │   ├── json/
│   │   └── txt/
│   ├── tests/
│   │   ├── activities/
│   │   └── authors/
│   │   └── examples/
│   └── utils/
├── .gitignore
└── README.md
```

## Main Components

- **config:**  
In this folder, we can create every kind of configuration file, such as the env.json that we can set the BASE_URL of the project, or the setup.js that allows us to initialize every env file before run the test.

- **constants:**  
Constant files to use on the test files.

- **core:**  
Here we can find the request-rest-base.js, the main and most important file for this architecture.

- **json-objects:**  
Define the JSON objects to use them in the tests.

- **requests:**  
The request builder files, when we can setup the request structure, defining the method (e.g. GET, POST, PUT), the URL, the endpoint and etc.

- **resources:**  
Resources file to use on the tests, such as *.cvs* or *.txt* files.

- **tests:**  
Folder where our tests have to be created. *In the examples folder, we can find some kind of executors, that can help you to find the best executor when you'll build your test.*

- **utils:**  
Utils files, which we can create generic methods to use in all projects. 

## Architecture

This framework uses the [HTTPX library](https://jslib.k6.io/httpx/) for advanced HTTP client features, such as session management, custom headers, and flexible authentication.  
The base class (`src/core/request-rest-base.js`) is designed to support both the native k6 `http` module and HTTPX, allowing you to switch between them depending on your testing needs.

- **HTTPX Advantages:**  
  - Session persistence across requests  
  - Advanced cookie and header handling  
  - Support for custom authentication flows  
  - Useful for complex API automation scenarios

- **k6 HTTP Module:**  
  - Full integration with k6 metrics and reporting  
  - Recommended for standard load and performance testing

You can easily adapt the framework to use either client by modifying the base class.

k6 test script that runs load scenarios and generates an HTML report.

## Initial setup (Windows)

These instructions will help you prepare the environment to run this project using TypeScript and the k6 runtime.

1) Install k6 v1.2.2

Note: this repo was tested with k6 v1.2.2. If you encounter issues importing classes with newer k6 versions, try v1.2.2.

- Using Chocolatey (requires Chocolatey installed) or winget:

```powershell
choco install k6 --version=1.2.2 -y
```

- Manual download (if you need a specific version):

  - Go to: https://github.com/grafana/k6/releases/tag/v1.2.2
  - Download the Windows zip, extract `k6.exe` and add its folder to your PATH.

- Verify the installation:

```powershell
k6 version
```

2) Initialize Node / TypeScript in the project

From the project root (where `package.json` is located) run:

```powershell
npm install --save-dev typescript @types/k6
# optional: npm install --save-dev @types/node
```

3) Add / update `tsconfig.json`

Create or update `tsconfig.json` at the project root with the following recommended configuration. It works well for k6 + TypeScript projects and ensures the compiler picks up k6 typings:

```json
{
  "compilerOptions": {
    "strict": true,
    "allowImportingTsExtensions": true,
    "target": "ES2020",
    "module": "ESNext",
    "allowJs": false,
    "esModuleInterop": true,
    "isolatedModules": true,
    "resolveJsonModule": true,
    "noEmit": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

4) Useful `package.json` scripts

Add these scripts to your `package.json` to simplify build and run tasks:

```json
"scripts": {
  "test:run": "k6 run src/tests/activities/get-activities.test.ts"
}
```

5) How to run tests

- Run a compiled test with k6 (example):

```powershell
# adjust the path to the generated .js file from the build
k6 run dist/tests/activities/get-activities.test.ts
```

Tips
- For CSV files with multiple columns we recommend adding a header row — it makes mapping to objects simpler and less error-prone.

## Add a new test quickly and easily
1. Create the request in the [requests-folder](./src/requests) following the same pattern to the other. If you have to use a POST or a PUT request, make sure to define the request body in [json-objects](./src/json-objects). Don't forget it, if you have to use token validation, make sure to include the token in the request headers through the [env.json](./src/config/env.json) variables.
2. Create a test script in the [tests-folder](./src/tests). This script will import the request and define the test scenario. 

## Reporting
After execution, an HTML report is automatically generated (e.g., report.html).

## Customization
- Add new JSON templates in src/json-objects/.
- Implement new requests in src/requests/.
- Create new test scenarios in src/tests/.
- Add new [assertions](https://grafana.com/docs/k6/latest/using-k6/assertions/), [validations](https://grafana.com/docs/k6/latest/using-k6/checks/) and [metrics](https://grafana.com/docs/k6/latest/using-k6/metrics/) in src/tests/.

## References
- k6 Documentation
- k6 Reporter