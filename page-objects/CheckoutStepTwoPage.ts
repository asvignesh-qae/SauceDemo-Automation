import { Page, Locator, expect } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class CheckoutStepTwoPage extends AbstractPage{
  readonly finishButton: Locator;
  readonly summaryTotal: Locator;
  readonly summaryTax: Locator;
  readonly summarySubtotal: Locator;
  readonly cancelButton: Locator;
  readonly pageTitle: Locator;
  readonly paymentInfoLabel: Locator;
  readonly shippingInfoLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.finishButton = page.locator(`[data-test="finish"]`);
    this.summaryTotal = page.locator(`.summary_total_label`);
    this.summaryTax = page.locator(`.summary_tax_label`);
    this.summarySubtotal = page.locator(`.summary_subtotal_label`);
    this.cancelButton = page.locator(`[data-test="cancel"]`);
    this.pageTitle = page.locator(`span[class='title']`);
    this.paymentInfoLabel = page.locator(`[data-test="payment-info-value"]`);
    this.shippingInfoLabel = page.locator(`[data-test="shipping-info-value"]`);
  }

  async validateIfOnCheckoutStepTwoPage(): Promise<void> {
    await this.validatePage("Swag Labs", /saucedemo\.com\/checkout-step-two\.html/, "Checkout: Overview");
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
    await this.page.waitForURL("**/checkout-complete.html");
  }

  async validateTotalAmounts(): Promise<void> {
    await expect(this.summaryTotal).toBeVisible();
    await expect(this.summaryTax).toBeVisible();
    await expect(this.summarySubtotal).toBeVisible();
  }

  async validatePaymentAndShippingInfo(): Promise<void> {
    await expect(this.paymentInfoLabel).toBeVisible();
    await expect(this.paymentInfoLabel).toContainText("SauceCard");
    await expect(this.shippingInfoLabel).toBeVisible();
    await expect(this.shippingInfoLabel).toContainText("Delivery");
  }

  async getTotalAmount(): Promise<string> {
    return (await this.summaryTotal.textContent()) || "";
  }

  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
  }
}
