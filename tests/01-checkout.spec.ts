import { test, expect } from "../fixtures/auth-fixture";
import { testData } from "@utils/testData";

test.describe("Successfully purchase of the items", () => {
  const itemsToAdd = [
    testData.products.backpack,
    testData.products.bikeLight,
    testData.products.boltTShirt,
  ];

  test("Test 1: User can add items to cart and successfully purchase them", async ({ authenticatedPage: pm }) => {
    await test.step("User verifies that the cart is empty", async () => {
      expect(await pm.onInventoryPage().getCartItemCount()).toBe(0);
    });

    await test.step("User adds a few items to their cart", async () => {
      for (const item of itemsToAdd) {
        await pm.onInventoryPage().addItemToCartByName(item);
      }
    });

    await test.step("User validates that the cart has the correct number of items", async () => {
      expect(await pm.onInventoryPage().getCartItemCount()).toBe(
        itemsToAdd.length
      );
    });

    await test.step("User proceeds to checkout", async () => {
      await pm.onInventoryPage().goToCart();
    });

    await test.step("User validates the cart page", async () => {
      await pm.onCartPage().validateIfOnCartPage();
    });

    await test.step("User validates that the cart has the correct number of items", async () => {
      expect(await pm.onCartPage().getCartItemCount()).toBe(itemsToAdd.length);
    });

    await test.step("User proceeds to checkout", async () => {
      await pm.onCartPage().proceedToCheckout();
    });

    await test.step("User validates the checkout Step One Page", async () => {
      await pm.onCheckoutStepOnePage().validateIfOnCheckoutStepOnePage();
    });

    await test.step("User fills the checkout form and continues to the next step", async () => {
      await pm
        .onCheckoutStepOnePage()
        .completeCheckout(
          testData.checkout.firstName,
          testData.checkout.lastName,
          testData.checkout.postalCode
        );
    });

    await test.step("User validates the checkout Step Two Page", async () => {
      await pm.onCheckoutStepTwoPage().validateIfOnCheckoutStepTwoPage();
    });

    await test.step("User validates PaymentAndShippingInfo and Total Amounts in checkout Step Two Page", async () => {
      await pm.onCheckoutStepTwoPage().validatePaymentAndShippingInfo();
      await pm.onCheckoutStepTwoPage().validateTotalAmounts();
    });

    await test.step("User Finishes the checkout process", async () => {
      await pm.onCheckoutStepTwoPage().finishCheckout();
    });

    await test.step("User validates the checkout Complete page", async () => {
      await pm.onCheckoutCompletePage().validateIfOnCheckoutCompletePage();
    });

    await test.step("User validates successful purchase the items in the checkout Complete page", async () => {
      await pm.onCheckoutCompletePage().validateSuccessfulPurchase();
    });
  });
});
