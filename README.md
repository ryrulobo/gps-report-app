# gps-report-app

A simple report application to store the GPS data of their devices and provide insights from the data.

`Created using React Js and Postgresql`

## Project Setup

- **Server**

  **Install depedency modules**

  After installing dependencies, user should create, migrate, and seed database.

  ```
  npm install
  npx sequelize db:create
  npx sequelize db:migrate
  npx sequelize db:seed:all
  ```

  **Run and compile server scripts**

  ```
  npm start
  ```

  **Run server unit test**

  First, uncomment scripts in `.sequelizerc` file. And then create and migrate new database_test using:

  ```
  npx sequelize db:create
  npx sequelize db:migrate
  ```

  **Run the test**

  ```
  npm run test
  ```

  After running server test, comment scripts in `.sequelizerc` file.

- **Client**

  **Install depedency modules**

  ```
  npm install
  ```

  **Run and compile server scripts**

  ```
  cd gps-report-app
  npm start
  ```

## Endpoints

List of Available Endpoints:

- `POST /api/signup`
- `POST /api/login`
- `POST /api/logout`
- `GET /api`
- `GET /api/:deviceId`

### POST /api/signup

#### Description

- Register new user. User should input name, email, and password. Saved password will be encrypted in the database.

#### Request

- Body

  ```json
  {
    "name": "John Doe",
    "email": "johndoe@mail.com",
    "password": "johndoe"
  }
  ```

#### Response

_201 - Created_

- Body

  ```json
  {
    "id": 1,
    "username": "John Doe",
    "email": "johndoe@mail.com"
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "message": "Please provide a user name"
  }
  OR
  {
    "message": "Please provide an email"
  }
  OR
  {
    "message": "Please provide a password"
  }
  OR
  {
    "message": "Email must be valid"
  }
  OR
  {
    "message": "Minimum password length is 5 characters"
  }
  ```

### POST /api/login

#### Description

- Login allows a user to gain access to the application by entering existed email and password. Login token only valid for 1 day after user login. After that, user should login again to refresh their login token and gain access to the application.

#### Request

- Body

  ```json
  {
    "email": "johndoe@mail.com",
    "password": "johndoe"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "response": {
      "loginToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwidXNlcl9pZCI6MSwiaWF0IjoxNjY5ODg3OTk0LCJleHAiOjE2Njk5NzQzOTR9.tCwnqECK5wrP5_nqfmbEszmsFIj_-AG1FTXohk1rhgg"
    }
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "message": "Please provide an email"
  }
  OR
  {
    "message": "Please provide a password"
  }
  ```

_401 - Unauthorized_

- Body

  ```json
  {
    "message": "Invalid email/password"
  }
  ```

### POST /api/logout

#### Description

- Logout current user. User will need to pass the login token in order to logout.

#### Request

- Headers

  ```json
  {
    "loginToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwidXNlcl9pZCI6MSwiaWF0IjoxNjY5ODg3OTk0LCJleHAiOjE2Njk5NzQzOTR9.tCwnqECK5wrP5_nqfmbEszmsFIj_-AG1FTXohk1rhgg"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "message": "Logged out successfully"
  }
  ```

_401 - Unauthorized_

- Body

  ```json
  {
    "message": "Token expired, please login to continue"
  }
  OR
  {
    "message": "Invalid token"
  }
  ```

### GET /api

#### Description

- Get data GPS data from database. Data can be sorted and filtered by Device ID or Device Type. Pagination can also be applied to the server when server is getting a page parameter from the request.

#### Request

example: `/api?page=1&q=asset&id=desc`

- Headers

  ```json
  {
    "loginToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwidXNlcl9pZCI6MSwiaWF0IjoxNjY5ODg3OTk0LCJleHAiOjE2Njk5NzQzOTR9.tCwnqECK5wrP5_nqfmbEszmsFIj_-AG1FTXohk1rhgg"
  }
  ```

- Params
  ```json
  page: current page,
  q: search query based on device ID or type,
  id: sort filter by device id (ASC/DESC),
  type: sort filter by device type (ASC/DESC)
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "count": 6,
    "rows": [
      {
        "id": 11,
        "DeviceId": "D-1569",
        "DeviceType": "Asset",
        "Timestamp": "2022-08-31T03:15:00.000Z",
        "location": "L4"
      },
      ...
    ]
  }
  ```

_401 - Unauthorized_

- Body

  ```json
  {
    "message": "Token expired, please login to continue"
  }
  OR
  {
    "message": "Invalid token"
  }
  ```

### GET /api

#### Description

- Get data GPS data based on the device ID.

#### Request

example: `/api/D-1567`

- Headers

  ```json
  {
    "loginToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwidXNlcl9pZCI6MSwiaWF0IjoxNjY5ODg3OTk0LCJleHAiOjE2Njk5NzQzOTR9.tCwnqECK5wrP5_nqfmbEszmsFIj_-AG1FTXohk1rhgg"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  [
    {
      "id": 1,
      "DeviceId": "D-1567",
      "DeviceType": "Aircraft",
      "Timestamp": "2022-08-31T03:05:00.000Z",
      "location": "L1"
    },
    ...
  ]
  ```

_401 - Unauthorized_

- Body

  ```json
  {
    "message": "Token expired, please login to continue"
  }
  OR
  {
    "message": "Invalid token"
  }
  ```

### Global Error

#### Response

_400 - SequelizeValidationError_ OR _400 - SequelizeUniqueConstraintError_

## Screenshots

### Login Page

![login-page](assets/login-page.png)

### Register Page

![register-page](assets/register-page.png)

### Home Page

![home-page](assets/home-page.png)

### Detail Page

![detail-page](assets/detail-page.png)

### Server Test

![server-test](assets/server-test.png)
