import { Page, Locator, expect } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class LoginPage extends AbstractPage{
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator(`#user-name`);
    this.passwordInput = page.getByRole("textbox", {
      name: "Password",
      exact: true,
    });
    this.loginButton = page.getByRole("button", { name: "Login", exact: true });
  }

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async validateLoginPage(): Promise<void> {
    await this.validatePage("Swag Labs", /saucedemo\.com/);
  }
}
