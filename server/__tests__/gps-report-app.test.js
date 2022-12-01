const request = require("supertest");
const moment = require("moment");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { User } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

// Data
let token;

const users = [
  {
    name: "John Doe",
    email: "johndoe@mail.com",
    password: hashPassword("johndoe"),
    tokens: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Jane Doe",
    email: "janedoe@mail.com",
    password: hashPassword("janedoe"),
    tokens: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const data = [
  {
    DeviceId: "D-1567",
    DeviceType: "Aircraft",
    Timestamp: "31-08-2022 10:20",
    location: "L1",
  },
  {
    DeviceId: "D-1567",
    DeviceType: "Aircraft",
    Timestamp: "31-08-2022 10:25",
    location: "L2",
  },
  {
    DeviceId: "D-1568",
    DeviceType: "Personal",
    Timestamp: "31-08-2022 10:15",
    location: "L3",
  },
  {
    DeviceId: "D-1568",
    DeviceType: "Personal",
    Timestamp: "31-08-2022 10:20",
    location: "L3",
  },
  {
    DeviceId: "D-1568",
    DeviceType: "Personal",
    Timestamp: "31-08-2022 10:25",
    location: "L3",
  },
  {
    DeviceId: "D-1569",
    DeviceType: "Asset",
    Timestamp: "31-08-2022 10:15",
    location: "L4",
  },
  {
    DeviceId: "D-1569",
    DeviceType: "Asset",
    Timestamp: "31-08-2022 10:20",
    location: "L4",
  },
  {
    DeviceId: "D-1570",
    DeviceType: "Personal",
    Timestamp: "31-08-2022 10:35",
    location: "L5",
  },
];

beforeAll(async () => {
  await queryInterface
    .bulkInsert("Users", users, {})
    .then(() => {
      return User.findOne({
        where: {
          email: users[0].email,
        },
      });
    })
    .then(async () => {
      const { body } = await request(app).post("/api/login").send({
        email: "johndoe@mail.com",
        password: "johndoe",
      });
      token = body.response.loginToken;
    });
  // .then((res) => {
  //   token = signToken({
  //     email: res.email,
  //     user_id: res.id,
  //   });
  // });

  data.forEach((el) => {
    el.Timestamp = moment(el.Timestamp, "DD-MM-YYYY hh:mm").toDate();
    el.createdAt = new Date();
    el.updatedAt = new Date();
  });
  await queryInterface.bulkInsert("Data", data);
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await queryInterface.bulkDelete("Data", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

//! Test Cases
describe("POST /api/signup", () => {
  test("POST /api/signup - success test", async () => {
    const payload = {
      name: "admin",
      email: "admin@mail.com",
      password: "admin",
    };

    const response = await request(app).post("/api/signup").send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("username", "admin");
    expect(response.body).toHaveProperty("email", "admin@mail.com");
  });

  test("POST /api/signup - failed test - empty name", async () => {
    const payload = {
      name: "",
      email: "admin@mail.com",
      password: "admin",
    };

    const response = await request(app).post("/api/signup").send(payload);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Please provide a user name"
    );
  });

  test("POST /api/signup - failed test - empty email", async () => {
    const payload = {
      name: "admin",
      email: "",
      password: "admin",
    };

    const response = await request(app).post("/api/signup").send(payload);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Please provide an email");
  });

  test("POST /api/signup - failed test - duplicate email", async () => {
    const payload = {
      name: "admin",
      email: "admin@mail.com",
      password: "admin",
    };

    const response = await request(app).post("/api/signup").send(payload);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email has already been taken"
    );
  });

  test("POST /api/signup - failed test - invalid email format", async () => {
    const payload = {
      name: "admin",
      email: "adminmail.com",
      password: "admin",
    };

    const response = await request(app).post("/api/signup").send(payload);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email must be valid");
  });

  test("POST /api/signup - failed test - empty password", async () => {
    const payload = {
      name: "admin",
      email: "admin@mail.com",
      password: "",
    };

    const response = await request(app).post("/api/signup").send(payload);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Please provide a password"
    );
  });

  test("POST /api/signup - failed test - password length < 5 characters", async () => {
    const payload = {
      name: "admin2",
      email: "admin2@mail.com",
      password: "ad",
    };

    const response = await request(app).post("/api/signup").send(payload);
    console.log(response.body, "<<<<<");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Minimum password length is 5 characters"
    );
  });
});

describe("POST /api/login", () => {
  test("POST /api/login - success test", async () => {
    const payload = {
      email: "johndoe@mail.com",
      password: "johndoe",
    };

    const response = await request(app).post("/api/login").send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("response", expect.any(Object));
    expect(response.body.response).toHaveProperty(
      "loginToken",
      expect.any(String)
    );

    await request(app)
      .post("/api/logout")
      .set("loginToken", response.body.response.loginToken);
  });

  test("POST /api/login - failed test - empty email", async () => {
    const payload = {
      email: "",
      password: "johndoe",
    };

    const response = await request(app).post("/api/login").send(payload);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Please provide an email");
  });

  test("POST /api/login - failed test - empty password", async () => {
    const payload = {
      email: "johndoe@mail.com",
      password: "",
    };

    const response = await request(app).post("/api/login").send(payload);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Please provide a password"
    );
  });

  test("POST /api/login - failed test - wrong email", async () => {
    const payload = {
      email: "johndoe_wrong@mail.com",
      password: "admin",
    };

    const response = await request(app).post("/api/login").send(payload);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid email/password");
  });

  test("POST /api/login - failed test - wrong password", async () => {
    const payload = {
      email: "johndoe@mail.com",
      password: "wrong_password",
    };

    const response = await request(app).post("/api/login").send(payload);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid email/password");
  });
});

describe("POST /api/logout", () => {
  test("POST /api/logout - success test", async () => {
    const payload = {
      email: "janedoe@mail.com",
      password: "janedoe",
    };
    const { body } = await request(app).post("/api/login").send(payload);
    const token = body.response.loginToken;

    const response = await request(app)
      .post("/api/logout")
      .set("loginToken", token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Logged out successfully");

    // Check if logout method clears tokens
    const { dataValues } = await User.findOne({
      where: {
        email: users[1].email,
      },
    });
    expect(dataValues.tokens).toBeInstanceOf(Array);
    expect(dataValues.tokens).toHaveLength(0);
  });

  test("POST /api/logout - failed test - unauthorized (no login token included)", async () => {
    const payload = {
      email: "johndoe@mail.com",
      password: "johndoe",
    };

    const response = await request(app).post("/api/logout");

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Unauthorized activity");
  });
});

describe("GET /api", () => {
  test("GET /api - success test", async () => {
    const response = await request(app).get("/api").set("loginToken", token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.count).toEqual(data.length);
    expect(response.body.rows).toBeInstanceOf(Array);
    expect(response.body.rows).toHaveLength(5);
    expect(response.body.rows[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body.rows[0]).toHaveProperty(
      "DeviceId",
      expect.any(String)
    );
    expect(response.body.rows[0]).toHaveProperty(
      "DeviceType",
      expect.any(String)
    );
    expect(response.body.rows[0]).toHaveProperty(
      "Timestamp",
      expect.any(String)
    );
    expect(response.body.rows[0]).toHaveProperty(
      "location",
      expect.any(String)
    );
  });

  test("GET /api - success test - pagination test", async () => {
    const response = await request(app)
      .get("/api?page=2")
      .set("loginToken", token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.count).toEqual(data.length);
    expect(response.body.rows).toBeInstanceOf(Array);

    // Data length is 8, so the result length must be 8 - 5 = 3
    expect(response.body.rows).toHaveLength(data.length - 5);
    expect(response.body.rows[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body.rows[0]).toHaveProperty(
      "DeviceId",
      expect.any(String)
    );
    expect(response.body.rows[0]).toHaveProperty(
      "DeviceType",
      expect.any(String)
    );
    expect(response.body.rows[0]).toHaveProperty(
      "Timestamp",
      expect.any(String)
    );
    expect(response.body.rows[0]).toHaveProperty(
      "location",
      expect.any(String)
    );
  });

  test("GET /api - success test - filter by DeviceId", async () => {
    const id = "D-1567";
    const response = await request(app)
      .get(`/api?q=${id}`)
      .set("loginToken", token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.count).toEqual(expect.any(Number));
    expect(response.body.rows).toBeInstanceOf(Array);
    expect(response.body.rows[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body.rows[0]).toHaveProperty(
      "DeviceId",
      expect.any(String)
    );
    expect(response.body.rows[0].DeviceId).toEqual(id);
    expect(response.body.rows[0]).toHaveProperty(
      "DeviceType",
      expect.any(String)
    );
    expect(response.body.rows[0]).toHaveProperty(
      "Timestamp",
      expect.any(String)
    );
    expect(response.body.rows[0]).toHaveProperty(
      "location",
      expect.any(String)
    );
  });

  test("GET /api - success test - filter by DeviceType", async () => {
    const type = "Aircraft";
    const response = await request(app)
      .get(`/api?q=${type}`)
      .set("loginToken", token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.count).toEqual(expect.any(Number));
    expect(response.body.rows).toBeInstanceOf(Array);
    expect(response.body.rows[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body.rows[0]).toHaveProperty(
      "DeviceId",
      expect.any(String)
    );
    expect(response.body.rows[0]).toHaveProperty(
      "DeviceType",
      expect.any(String)
    );
    expect(response.body.rows[0].DeviceType).toEqual(type);
    expect(response.body.rows[0]).toHaveProperty(
      "Timestamp",
      expect.any(String)
    );
    expect(response.body.rows[0]).toHaveProperty(
      "location",
      expect.any(String)
    );
  });

  test("GET /api/ - failed test - unauthorized (no login token included)", async () => {
    const response = await request(app).get(`/api`);

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Unauthorized activity");
  });

  test("GET /api/ - failed test - expired token", async () => {
    let expiredToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAbWFpbC5jb20iLCJ1c2VyX2lkIjoxLCJpYXQiOjE2Njk4MDkxMTQsImV4cCI6MTY2OTgwOTEyNH0.lHs7SoriS-aGJkK1-IN3fNcYvH041LjIQ5QfV_NzKZU";
    const response = await request(app)
      .get(`/api`)
      .set("loginToken", expiredToken);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Token expired, please login to continue"
    );
  });

  test("GET /api/ - failed test - invalid token", async () => {
    const payload = {
      email: "johndoe@mail.com",
      password: "johndoe",
    };
    const { body } = await request(app).post("/api/login").send(payload);
    let token = body.response.loginToken.slice(0, -5) + "ABC123";

    const response = await request(app).get(`/api`).set("loginToken", token);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
});

describe("GET /api/:deviceId", () => {
  test("GET /api/:deviceId - success test", async () => {
    const id = "D-1567";
    const response = await request(app)
      .get(`/api/${id}`)
      .set("loginToken", token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("DeviceId", expect.any(String));
    expect(response.body[0].DeviceId).toEqual(id);
    expect(response.body[0]).toHaveProperty("DeviceType", expect.any(String));
    expect(response.body[0]).toHaveProperty("Timestamp", expect.any(String));
    expect(response.body[0]).toHaveProperty("location", expect.any(String));
  });

  test("GET /api/:deviceId - failed test - unauthorized (no login token included)", async () => {
    const id = "D-1567";
    const response = await request(app).get(`/api/${id}`);

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Unauthorized activity");
  });
});
