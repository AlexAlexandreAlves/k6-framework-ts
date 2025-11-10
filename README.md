<div style="text-align: justify;">

# k6 REST Test Framework

This project provides a modular architecture for REST API testing using [k6](https://k6.io/). It helps organize test scenarios, input data, and reporting in a scalable and maintainable way.

## Folder Structure

```
calendar-date-automation-test
├── src
│   ├── config/                     # Configuration files
│   │   └── env.json                # Environment variables
│   │   └── setup.ts                # Setup script for initializing environment
│   │
│   ├── constants/                  # Constant files
│   │   └── constants-example.ts    # Example constants file
│   │   └── status.ts               # HTTP status codes to use on tests
│   │
│   ├── core/
│   │   └── metrics-recorder.ts     # Metrics recorder class
│   │   └── metrics.ts              # Metrics definitions for k6
│   │   └── request-rest-base.ts    # Base request class
│   │
│   ├── interface/                  # TypeScript interfaces
│   │   └── IActivities.ts          # Activities interface
│   │   └── IAuthors.ts             # Authors interface
│   │
│   ├── json-objects/               # JSON templates for requests
│   │   ├── activities/             # Activities JSON objects
│   │   └── authors/                # Authors JSON objects     
│   │
│   ├── requests/                   # Request builders
│   │   ├── activities/             # Activities requests
│   │   └── authors/                # Authors requests        
│   │
│   ├── resources                   # Resource files         
│   │   ├── csv/                    # CSV files      
│   │   ├── json/                   # JSON files     
│   │   └── txt/                    # TXT files 
│   │
│   ├── tests/                      # Test scripts          
│   │   ├── activities/
│   │   └── authors/
│   │   └── examples/
│   │   └── suite.ts                # Test suite runner
│   │
│   ├── types/                      # Type definitions
│   │   └── k6-global.d.ts          # k6 global types          
│   │
│   └── utils/                      # Utility functions        
├── .gitignore
└── README.md
```

## Architecture

This framework uses the [HTTPX library](https://jslib.k6.io/httpx/) for advanced HTTP client features, such as session management, custom headers, and flexible authentication.  
The base class (`src/core/request-rest-base.ts`) is designed to support both the native k6 `http` module and HTTPX, allowing you to switch between them depending on your testing needs.

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

## Pattern

The project is configured with a modular architecture, that provides easy scalability and maintainability through the **_request-rest-base.ts_** base class. Each request class extends this base class, inheriting common functionality while allowing for specific request implementations. Following this pattern you can create new tests like:

- When creating a new POST or PUT request first create the JSON template in the **_json-objects_** folder.
- Then, define the request in the **_requests_** folder, extending the base class and using the JSON template if needed.

Example:

```typescript
import RequestRestBase from "../../core/request-rest-base.ts";
import { IActivitiesCreate } from "../../interface/IActivities.ts";

const url = __ENV.BASE_URL;

var template = open('../../json-objects/activities/post-activities.json');

export default class PostActivities extends RequestRestBase {

    constructor() {
        super();
        this.url = url;
        this.requestService = `/api/v1/Activities`;
        this.setMethod('POST');
        this.tag = 'PostActivities';
    }

    setJsonBodyFromTemplate(params: IActivitiesCreate): void {
        this.jsonBody = JSON.stringify({
            title: params.title,
            dueDate: params.dueDate,
            completed: params.completed
        });
    }
}
```
- At least one test script should be created in the **_tests_** folder to define the test scenario using the request class.

---

## Native Typescript
This framework is built using native TypeScript, leveraging its strong typing and modern features to enhance code quality and maintainability. TypeScript's static type checking helps catch errors early in the development process, making it easier to manage complex test scenarios and data structures.

#### The `tsconfig.json` and its importance:

The `tsconfig.json` file is crucial for configuring the TypeScript compiler options for this project. It ensures that the TypeScript code is compiled correctly and adheres to best practices. 

**Why is this important?**

- **k6 compile Typescript natively:** k6 has built-in support for TypeScript, allowing you to write your test scripts in TypeScript without needing a separate build step. The `tsconfig.json` file ensures that the TypeScript code is compiled correctly for k6.
  - **IDE Support**: Editors like VSCode use `tsconfig.json` to provide features like IntelliSense, error checking, and code navigation, enhancing the development experience.
  - **Local validation**: Allows verify type errors before to execute k6 tests.
  - **Consistent configuration**: Ensures that all developers working on the project use the same TypeScript settings, leading to more consistent code.

**How to use it?**
- The file its already configured and it doesn't need to be changed in most cases.
- Your editor must detect it automatically when you open the project folder and apply the settings.
- To check types manually: `npx tsc --noEmit` (without generating output files, only validation).


- How to declare types:

  - Global types for k6 are declared in `src/types/k6-global.d.ts`, ensuring that k6-specific globals are recognized by the TypeScript compiler.
  - Import k6 types in your test files as needed:

    ```typescript
    import { check, sleep } from 'k6';
    import http from 'k6/http';
    ```
  - Use native types in methods/functions:
  - Example of a function with typed parameters and return type:

    ```typescript
    function createActivity(title: string, dueDate: string, completed: boolean): IActivitiesCreate {
        return {
            title,
            dueDate,
            completed
        };
    }
    ``` 

- Recommended parameter pattern:

  - Choose to accept a single typed object `params` instead of multiple primitive parameters for better scalability and readability.

    ```typescript
    interface ICreateActivityParams {
        title: string;
        dueDate: string;
        completed: boolean;
    }

    function createActivity(params: ICreateActivityParams): IActivitiesCreate {
        return {
            title: params.title,
            dueDate: params.dueDate,
            completed: params.completed
        };
    }
    ```

    - Valuable types:
      
      - In k6 handlers, use `any` when necessary:
        ```typescript
        export function handleResponse(response: any): void {
            // Process the response
        }
        ```

- How to declare interfaces

  - Custom interfaces for request and response payloads are defined in the `src/interface/` directory, promoting strong typing and code clarity.
  - Example of an interface declaration:

    ```typescript
    export interface IActivitiesCreate {
        title: string;
        dueDate: string;
        completed: boolean;
    }
    ```
---

## Initial setup 

- **Windows OS instructions**
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

- Or **MACS OS / Linux OS instructions**
  
  - Follow the official k6 installation guide: https://k6.io/docs/getting-started/installation/
  
  

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
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "allowJs": false,
    "esModuleInterop": true,
    "isolatedModules": true,
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

</div>