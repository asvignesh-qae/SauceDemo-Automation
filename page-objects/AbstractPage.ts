import { Page, Locator, expect } from "@playwright/test";

export class AbstractPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Utility method to get cart badge count from a locator
   * Handles visibility check and returns 0 if badge is not visible
   */
  protected async getBadgeCount(cartBadgeLocator: Locator): Promise<number> {
    const isVisible = await cartBadgeLocator.isVisible();
    if (!isVisible) return 0;
    const text = await cartBadgeLocator.textContent();
    return parseInt(text || "0", 10);
  }

  /**
   * Base validation method for page navigation
   * Validates page title, URL pattern, and optional page heading
   */
  protected async validatePage(
    expectedTitle: string,
    urlPattern: RegExp | string,
    expectedHeading?: string
  ): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
    await expect(this.page).toHaveURL(urlPattern);
    if (expectedHeading) {
      await expect(this.page.locator(`span[class='title']`)).toHaveText(
        expectedHeading
      );
    }
  }
}
