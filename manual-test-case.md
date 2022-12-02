# Manual Test Case

API manual testing involves sending API requests to the server and waiting for the server's response. In this project, testing is done using Postman.

### POST /api/signup

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
  // [Empty user name input]
  {
    "message": "Please provide a user name"
  }
  OR
  // [Empty email input]
  {
    "message": "Please provide an email"
  }
  OR
  // [Empty password input]
  {
    "message": "Please provide a password"
  }
  OR
  // [Invalid email input]
  {
    "message": "Email must be valid"
  }
  OR
  // [Password input length less than 5 characters]
  {
    "message": "Minimum password length is 5 characters"
  }
  ```

### POST /api/login

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
  // [Empty email input]
  {
    "message": "Please provide an email"
  }
  OR
  // [Empty password input]
  {
    "message": "Please provide a password"
  }
  ```

_401 - Unauthorized_

- Body

  ```json
  // [Input wrong email or password]
  {
    "message": "Invalid email/password"
  }
  ```

### POST /api/logout

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
  // [Expired token]
  {
    "message": "Token expired, please login to continue"
  }
  OR
  // [Using wrong login token]
  {
    "message": "Invalid token"
  }
  ```

### GET /api

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
  // [Expired token]
  {
    "message": "Token expired, please login to continue"
  }
  OR
  // [Using wrong login token]
  {
    "message": "Invalid token"
  }
  ```

### GET /api/:deviceID

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
  // [Expired token]
  {
    "message": "Token expired, please login to continue"
  }
  OR
  // [Using wrong login token]
  {
    "message": "Invalid token"
  }
  ```
