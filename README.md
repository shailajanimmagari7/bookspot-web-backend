# Bookspot Backend

This **Bookspot Backend** application is built using **TypeScript**. It serves as the backend for the Bookspot Web Application.

## Description

This is the initial setup for the Bookspot Backend of the web application, providing the API functionality for managing books and users. The backend is built using TypeScript and leverages PostgreSQL as the database, Express for routing, and Jest for testing.

# Table of Contents

- [Technologies Used](#technologies-used)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)

# Technologies Used

- TypeScript
- PostgresSql
- Express
- Jest

# Requirements

Before you start, ensure that you have the following dependencies installed:

1. Node.js:
   Install Node.js to run JavaScript on the server:

   ```bash
   brew install node
   ```

2. Typescript:
   Install TypeScript globally if you haven't already:
   ```bash
   npm install -g typescript
   ```
3. Jest:
   Jest is used for testing the API. To install it:
   ```bash
   npm install --save-dev jest
   ```
4. PostgreSQL:
   Install the PostgreSQL client library for Node.js:
   ```bash
  npm install pg
  ```
5. Express:
   Express is a web framework used to handle HTTP requests and responses. To install it:
     ```bash
  npm install express
  ```
6. CORS:
   CORS (Cross-Origin Resource Sharing) is used to allow or restrict resources on the backend server to be requested from different domains. To install it:
  ```bash
  npm install cors
  ```
7. Nodemon:
   Nodemon automatically restarts your application whenever file changes are detected. Install it globally for development use:
  ```bash
  npm install nodemon
 ```

# Installation

1. Clone the Repository

   ```bash
   git clone git@github.com:shailajanimmagari7/bookspot-web-backend.git
   cd bookspot-web-backend
   ```

2. Install dependencies
   Once inside the project directory, install the required dependencies:
   ```bash
    npm install
   ```
3. Run Tests with Jest

- Jest is used as the testing framework for the project. To run the tests:
  ```bash
  npx test
  ```

4. Run the Backend API

- You can run the backend in development
  ```bash
  npx tsc-node index.ts
  ```

5. Run Tests with Coverage:
   To run tests and get a coverage report, use:
   ```bash
   npm test -- --coverage
   ```
6. Run a Specific Test:
   If you want to run a specific test file, you can use the following command:
   ```bash
   npm test <test-file-path>
   ```
