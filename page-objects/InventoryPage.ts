import { Page, Locator, expect } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class InventoryPage extends AbstractPage{
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly cartLink: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryItems = page.locator(`.inventory_item`);
    this.cartBadge = page.locator(`.shopping_cart_badge`);
    this.sortDropdown = page.locator(`[data-test="product-sort-container"]`);
    this.cartLink = page.locator(`.shopping_cart_link`);
    this.productNames = page.locator(`.inventory_item_name`);
    this.productPrices = page.locator(`.inventory_item_price`);
  }

  async validateInventoryPage(): Promise<void> {
    await this.validatePage("Swag Labs", /saucedemo\.com\/inventory\.html/, "Products");
  }

  async getCartItemCount(): Promise<number> {
    return await this.getBadgeCount(this.cartBadge);
  }

  async addItemToCartByName(productName: string): Promise<void> {
    const item = this.page.locator(`.inventory_item`, {
      has: this.page.locator(`.inventory_item_name`, { hasText: productName }),
    });
    await item.locator(`button[id^="add-to-cart"]`).click();
  }

  async addItemToCartByIndex(index: number): Promise<void> {
    const addButton = this.inventoryItems
      .nth(index)
      .locator(`button[id^="add-to-cart"]`);
    await addButton.click();
  }

  async addMultipleItemsToCart(count: number): Promise<string[]> {
    const addedItems: string[] = [];
    for (let i = 0; i < count && i < 6; i++) {
      const item = this.inventoryItems.nth(i);
      const productName = await item
        .locator(`.inventory_item_name`)
        .textContent();
      await item.locator(`button[id^="add-to-cart"]`).click();
      if (productName) addedItems.push(productName);
    }
    return addedItems;
  }

  async sortBy(option: "az" | "za" | "lohi" | "hilo"): Promise<void> {
    await this.sortDropdown.selectOption(option);
    await this.page.waitForLoadState('networkidle');
  }

  async getProductNames(): Promise<string[]> {
    const names = await this.productNames.allTextContents();
    return names;
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.productPrices.allTextContents();
    return priceTexts.map((price) => parseFloat(price.replace("$", "")));
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
    await this.page.waitForURL("**/cart.html");
  }

  async isOnInventoryPage(): Promise<boolean> {
    return this.page.url().includes("/inventory.html");
  }
}
