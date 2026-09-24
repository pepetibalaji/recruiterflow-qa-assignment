import { test, expect } from "../../fixtures/test.fixture";

test.describe("Products and cart", () => {
  test("adds two products and updates the cart badge", async ({
    loggedInProductsPage,
  }) => {
    await loggedInProductsPage.addProductToCart("Sauce Labs Backpack");
    await loggedInProductsPage.addProductToCart("Sauce Labs Bike Light");

    await expect.soft(loggedInProductsPage.cartBadge).toHaveText("2");
  });

  test("sorts products by price from low to high", async ({
    loggedInProductsPage,
  }) => {
    await loggedInProductsPage.sortByPriceLowToHigh();

    const displayedPrices = await loggedInProductsPage.getDisplayedPrices();

    expect.soft(displayedPrices).not.toHaveLength(0);
    expect.soft(displayedPrices[0]).toBe(Math.min(...displayedPrices));
  });
});
