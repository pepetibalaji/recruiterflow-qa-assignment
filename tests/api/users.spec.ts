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

    expect(response.status()).toBe(200);

    const body = (await response.json()) as UsersResponse;

    expect(body.data).toBeInstanceOf(Array);
    expect(body.data.length).toBeGreaterThan(0);

    for (const user of body.data) {
      expect(user).toEqual(
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
      expect(response.status()).toBe(201);
      expect(body).toMatchObject(userPayload);
      expect(body.id).toBeTruthy();
      expect(body.createdAt).toBeTruthy();
      expect(new Date(body.createdAt).getTime()).not.toBeNaN();
    });
  });
});
