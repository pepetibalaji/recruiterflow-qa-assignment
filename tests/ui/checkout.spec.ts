import { test, expect } from "../../fixtures/test.fixture";

test.describe("Checkout", () => {
  test("completes checkout for products in the cart", async ({
    loggedInProductsPage,
    cartPage,
    checkoutPage,
  }) => {
    await loggedInProductsPage.addProductToCart("Sauce Labs Backpack");
    await loggedInProductsPage.addProductToCart("Sauce Labs Bike Light");
    await loggedInProductsPage.openCart();

    await cartPage.checkout();

    await checkoutPage.enterDetails({
      firstName: "Pepeti",
      lastName: "Balaji",
      postalCode: "560001",
    });
    await checkoutPage.finishOrder();

    await expect.soft(checkoutPage.confirmationMessage).toHaveText(
      "Thank you for your order!",
    );
  });
});
