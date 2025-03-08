const request = require("supertest");
const app = require("../app");

const mongoose = require("mongoose");

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

describe("Users CRUD", function () {
  it("happy path", async function () {
    let userId;

    // CREATE
    // Given
    await request(app)
      // When
      .post("/api/v1/users")
      .send({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password",
      })
      // Then
      .then((res) => {
        expect(res.statusCode).toBe(201);

        expect(res.body).toMatchObject({
          name: "John Doe",
          email: "johndoe@example.com",
          id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });

        expect(res.body.password).toBeUndefined();

        userId = res.body.id;
      });
  });
});