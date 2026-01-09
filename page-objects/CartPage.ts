import { Page, Locator, expect } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class CartPage extends AbstractPage{
  readonly cartItems: Locator;
  readonly cartBadge: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartItemNames: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator(`.cart_item`);
    this.cartBadge = page.locator(`.shopping_cart_badge`);
    this.checkoutButton = page.locator(`[data-test="checkout"]`);
    this.continueShoppingButton = page.locator(
      `[data-test="continue-shopping"]`
    );
    this.cartItemNames = page.locator(`.inventory_item_name`);
  }

  async validateIfOnCartPage(): Promise<void> {
    await this.validatePage("Swag Labs", /saucedemo\.com\/cart\.html/, "Your Cart");
  }

  async getCartItemCount(): Promise<number> {
    const count = await this.cartItems.count();
    return count;
  }

  async getCartBadgeCount(): Promise<number> {
    return await this.getBadgeCount(this.cartBadge);
  }

  async getCartItemNames(): Promise<string[]> {
    const names = await this.cartItemNames.allTextContents();
    return names;
  }

  async removeItemByName(productName: string): Promise<void> {
    const item = this.page.locator(`.cart_item`, {
      has: this.page.locator(`.inventory_item_name`, { hasText: productName }),
    });
    await item.locator(`button[id^="remove"]`).click();
  }

  async removeItemByIndex(index: number): Promise<void> {
    const removeButton = this.cartItems
      .nth(index)
      .locator(`button[id^="remove"]`);
    await removeButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.page.waitForURL("**/checkout-step-one.html");
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
    await this.page.waitForURL("**/inventory.html");
  }

  async isCartEmpty(): Promise<boolean> {
    const count = await this.cartItems.count();
    return count === 0;
  }
}
