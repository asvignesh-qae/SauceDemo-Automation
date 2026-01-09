import { Page, Locator, expect } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class CheckoutCompletePage extends AbstractPage{
  readonly pageTitle: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(`span[class='title']`);
    this.completeHeader = page.locator(`.complete-header`);
    this.completeText = page.locator(`.complete-text`);
    this.backHomeButton = page.locator(`[data-test="back-to-products"]`);
  }

  async validateIfOnCheckoutCompletePage(): Promise<void> {
    await this.validatePage("Swag Labs", /saucedemo\.com\/checkout-complete\.html/, "Checkout: Complete!");
  }

  async isOrderCompleteVisible(): Promise<boolean> {
    return await this.completeHeader.isVisible();
  }

  async isOrderCompleteTextVisible(): Promise<boolean> {
    return await this.completeText.isVisible();
  }

  async goBackHome(): Promise<void> {
    await this.backHomeButton.click();
    await this.page.waitForURL("**/inventory.html");
  }
  
  async validateSuccessfulPurchase(): Promise<void> {
    expect(await this.isOrderCompleteVisible()).toBeTruthy();
    expect(await this.isOrderCompleteTextVisible()).toBeTruthy();
    await expect(this.completeHeader).toHaveText("Thank you for your order!");
    let dispatchConfirmationMessage = await this.completeText.textContent();
    expect(dispatchConfirmationMessage).toMatch(
      /Your order has been dispatched/
    );
  }
}
