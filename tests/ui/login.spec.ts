import { test, expect } from "../../fixtures/test.fixture";

test.describe("Login", () => {
  test("standard user can log in and land on the products page", async ({
    page,
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");

    await expect.soft(page).toHaveURL(/inventory\.html/);
    await expect.soft(page.getByTestId("title")).toHaveText("Products");
  });

  test("locked-out user sees an error and is not logged in", async ({
    page,
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.login("locked_out_user", "secret_sauce");

    await expect.soft(loginPage.errorMessage).toHaveText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
    await expect.soft(page).toHaveURL(/saucedemo\.com\/?$/);
  });
});
