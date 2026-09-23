import { type Locator, type Page } from "@playwright/test";

export class ProductsPage {
  readonly pageTitle: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;
  readonly productPrices: Locator;

  constructor(private readonly page: Page) {
    this.pageTitle = page.getByTestId("title");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
    this.cartLink = page.getByTestId("shopping-cart-link");
    this.sortDropdown = page.getByTestId("product-sort-container");
    this.productPrices = page.getByTestId("inventory-item-price");
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.page.getByTestId("inventory-item").filter({
      has: this.page
        .getByTestId("inventory-item-name")
        .filter({ hasText: productName }),
    });

    await product.getByRole("button", { name: "Add to cart" }).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async sortByPriceLowToHigh(): Promise<void> {
    await this.sortDropdown.selectOption("lohi");
  }

  async getDisplayedPrices(): Promise<number[]> {
    const priceTexts = await this.productPrices.allTextContents();

    return priceTexts.map((price) => Number(price.replace("$", "")));
  }
}
