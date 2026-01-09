import { Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";
import { LoginPage } from "./LoginPage";
import { InventoryPage } from "./InventoryPage";
import { CheckoutStepOnePage } from "./CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "./CheckoutStepTwoPage";
import { CheckoutCompletePage } from "./CheckoutCompletePage";
import { CartPage } from "./CartPage";

export class PageManager extends AbstractPage {
  private readonly loginPage: LoginPage;
  private readonly inventoryPage: InventoryPage;
  private readonly checkoutStepOnePage: CheckoutStepOnePage;
  private readonly checkoutStepTwoPage: CheckoutStepTwoPage;
  private readonly checkoutCompletePage: CheckoutCompletePage;
  private readonly cartPage: CartPage;

  constructor(page: Page) {
    super(page);
    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
    this.checkoutStepOnePage = new CheckoutStepOnePage(this.page);
    this.checkoutStepTwoPage = new CheckoutStepTwoPage(this.page);
    this.checkoutCompletePage = new CheckoutCompletePage(this.page);
    this.cartPage = new CartPage(this.page);
  }

  onLoginPage(): LoginPage {
    return this.loginPage;
  }
  onInventoryPage(): InventoryPage {
    return this.inventoryPage;
  }
  onCheckoutStepOnePage(): CheckoutStepOnePage {
    return this.checkoutStepOnePage;
  }
  onCheckoutStepTwoPage(): CheckoutStepTwoPage {
    return this.checkoutStepTwoPage;
  }
  onCheckoutCompletePage(): CheckoutCompletePage {
    return this.checkoutCompletePage;
  }
  onCartPage(): CartPage {
    return this.cartPage;
  }
}
