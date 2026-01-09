// spec: Authentication test suite
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import { credentials } from "@utils/credentials";

test.describe("Authentication", () => {
  test("Successful login with standard user", async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com
    await page.goto("https://www.saucedemo.com");

    // 2. Verify the login page displays with username and password fields
    await expect(page.getByRole("textbox", { name: "Username" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Password" })).toBeVisible();

    // 3. Enter 'standard_user' in the username field
    await page.locator('[data-test="username"]').fill("standard_user");

    // 4. Enter '' in the password field
    await page
      .locator('[data-test="password"]')
      .fill(credentials.standardUser.password);

    // 5. Click the Login button
    await page.locator('[data-test="login-button"]').click();

    // 6. Verify successful redirect to the products page (/inventory.html)
    await expect(page).toHaveURL(/.*inventory\.html/);

    // 7. Verify the page title shows 'Products'
    await expect(page.getByText("Products")).toBeVisible();

    // Verify menu button is accessible
    await expect(page.getByRole("button", { name: "Open Menu" })).toBeVisible();
  });
});
