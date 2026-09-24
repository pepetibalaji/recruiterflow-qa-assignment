import { test, expect } from "../../fixtures/api.fixture";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};

type UsersResponse = {
  data: User[];
};

type CreateUserResponse = {
  name: string;
  job: string;
  id: string;
  createdAt: string;
};

test.describe("ReqRes users API", () => {
  test("gets page two users with required fields", async ({ apiRequest }) => {
    const response = await apiRequest.get("/api/users?page=2");

    expect.soft(response.status()).toBe(200);

    const body = (await response.json()) as UsersResponse;

    expect.soft(body.data).toBeInstanceOf(Array);
    expect.soft(body.data.length).toBeGreaterThan(0);

    for (const user of body.data) {
      expect.soft(user).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          email: expect.any(String),
          first_name: expect.any(String),
          last_name: expect.any(String),
        }),
      );
    }
  });

  test("creates a user and validates the returned response", async ({
    apiRequest,
  }) => {
    const userPayload = {
      name: "morpheus",
      job: "leader",
    };

    const response = await test.step("Create a user", async () => {
      return apiRequest.post("/api/users", {
        data: userPayload,
      });
    });

    const body = (await response.json()) as CreateUserResponse;

    await test.step("Verify the create response contract", async () => {
      expect.soft(response.status()).toBe(201);
      expect.soft(body).toMatchObject(userPayload);
      expect.soft(body.id).toBeTruthy();
      expect.soft(body.createdAt).toBeTruthy();
      expect.soft(new Date(body.createdAt).getTime()).not.toBeNaN();
    });
  });
});
