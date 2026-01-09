import { Page, Locator, expect } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class CheckoutStepOnePage extends AbstractPage{
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator(`[data-test="firstName"]`);
    this.lastNameInput = page.locator(`[data-test="lastName"]`);
    this.postalCodeInput = page.locator(`[data-test="postalCode"]`);
    this.continueButton = page.locator(`[data-test="continue"]`);
    this.cancelButton = page.locator(`[data-test="cancel"]`);
  }

  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async validateIfOnCheckoutStepOnePage(): Promise<void> {
    await this.validatePage("Swag Labs", /saucedemo\.com\/checkout-step-one\.html/);
  }

  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
    await this.page.waitForURL("**/checkout-step-two.html");
  }

  async completeCheckout(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.fillCheckoutInformation(firstName, lastName, postalCode);
    await this.continueToOverview();
  }

  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
  }
}
