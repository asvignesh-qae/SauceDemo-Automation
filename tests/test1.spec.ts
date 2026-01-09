import {
  test,
  expect,
  Browser,
  BrowserContext,
  Page,
  chromium,
  Locator,
} from "@playwright/test";
import { credentials } from "@utils/credentials";

test.describe("user can add a few items to their cart and successfully purchase the items", () => {
  let browser: Browser;
  let browserContext: BrowserContext;
  let page: Page;

  test.beforeAll(async () => {
    browser = await chromium.launch({
      args: ["--start-maximized"],
    });
    browserContext = await browser.newContext();
    page = await browserContext.newPage();
  });

  test("User can add a few items to their cart and successfully purchase the items", async () => {
    await test.step("User navigates to the SauceDemo website", async () => {
      await page.goto("https://www.saucedemo.com/");
    });

    await test.step("User enters the username and password and logs in", async () => {
      await page.fill("#user-name", "standard_user");
      await page
        .getByRole("textbox", { name: "Password" })
        .fill(credentials.standardUser.password);
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("User navigates to the inventory page", async () => {
      await expect(page).toHaveURL(/saucedemo\.com\/inventory\.html/);
      await expect(page).toHaveTitle("Swag Labs");
    });

    await test.step("User verifies that the cart is empty", async () => {
      let cartBadge: Locator = page.locator(
        `#shopping_cart_container .shopping_cart_badge`
      );
      await expect(cartBadge).not.toBeVisible();
    });

    await test.step("User adds a few items to their cart", async () => {
      await page.locator("#add-to-cart-sauce-labs-backpack").click();
      await page.locator("#add-to-cart-sauce-labs-bike-light").click();
    });

    await test.step("User validates that the cart has the correct number of items", async () => {
      let cartBadge = page.locator(
        "#shopping_cart_container .shopping_cart_badge"
      );
      await expect(cartBadge).toHaveText("2");
    });

    await test.step("User proceeds to checkout", async () => {
      let cartBadge = page.locator("#shopping_cart_container");
      await cartBadge.click();
    });

    await test.step("User validates the checkout page", async () => {
      await expect(page).toHaveURL(/saucedemo\.com\/cart\.html/);
      await expect(page).toHaveTitle("Swag Labs");
    });

    await test.step("User validates that the cart has the correct number of items", async () => {
      let items = page.locator(".cart_list div.cart_item");
      await expect(items).toHaveCount(2);
    });

    await test.step("User proceeds to checkout", async () => {
      let checkoutButton = page.locator("#checkout");
      await checkoutButton.click();
    });

    await test.step("User validates the checkout page", async () => {
      await expect(page).toHaveURL(/saucedemo\.com\/checkout-step-one\.html/);
      await expect(page).toHaveTitle("Swag Labs");
    });

    await test.step("User fills the checkout form and continues to the next step", async () => {
      await page.fill("#first-name", "FirstName");
      await page.fill("#last-name", "LastName");
      await page.fill("#postal-code", "12345");
      await page.getByRole("button", { name: "Continue" }).click();
    });

    await test.step("User validates the checkout Overview page", async () => {
      await expect(page).toHaveURL(/saucedemo\.com\/checkout-step-two\.html/);
      await expect(page).toHaveTitle("Swag Labs");
      let pageTitle = page.locator(`span[class='title']`);
      await expect(pageTitle).toHaveText("Checkout: Overview");
    });

    await test.step("User validates the checkout Overview page", async () => {
      await expect(page).toHaveURL(/saucedemo\.com\/checkout-step-two\.html/);
      await expect(page).toHaveTitle("Swag Labs");
      await expect(
        page.locator('[data-test="payment-info-label"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-test="shipping-info-label"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-test="payment-info-value"]')
      ).toContainText(/SauceCard/);
      await expect(
        page.locator('[data-test="shipping-info-value"]')
      ).toContainText(/Delivery/);
      await expect(page.locator('[data-test="total-label"]')).toBeVisible();
      await page.getByRole("button", { name: "Finish", exact: true }).click();
    });

    await test.step("User validates the checkout Complete page", async () => {
      await expect(page).toHaveURL(/saucedemo\.com\/checkout-complete\.html/);
      await expect(page).toHaveTitle("Swag Labs");
      let pageTitle = page.locator(`span[class='title']`);
      await expect(pageTitle).toHaveText('Checkout: Complete!');
    });

    await test.step("User validates successfull purchase the items in the checkout Complete page", async () => {
      let orderConfirmation = await page.locator('[data-test="complete-header"]').innerText();
      expect(orderConfirmation).toEqual("Thank you for your order!");
      let dispatchConfirmationMessage = await page
        .locator('[data-test="complete-text"]')
        .innerText();
      expect(dispatchConfirmationMessage).toMatch(/Your order has been dispatched.*/);
    });
  });
});
