import { test, expect } from "../fixtures/auth-fixture";
import { testData } from "@utils/testData";

test.describe("Cart Management", () => {
  let cartItems: string[];
  let itemToRemove: string;
  let remainingItems: string[];
  const itemsToAdd = [
    testData.products.backpack,
    testData.products.bikeLight,
    testData.products.boltTShirt,
    testData.products.fleeceJacket,
  ];

  test("Test 2: User can add items, remove one, and cart reflects correct count", async ({ authenticatedPage: pm }) => {
    await test.step("User verifies that the cart is empty", async () => {
      expect(await pm.onInventoryPage().getCartItemCount()).toBe(0);
    });

    await test.step("User adds a few items to their cart", async () => {
      for (const item of itemsToAdd) {
        await pm.onInventoryPage().addItemToCartByName(item);
      }
    });

    await test.step("User verifies that the cart has the correct number of items", async () => {
      let cartCount = await pm.onInventoryPage().getCartItemCount();
      expect(cartCount).toBe(itemsToAdd.length);
    });

    await test.step("User navigates to the cart", async () => {
      await pm.onInventoryPage().goToCart();
    });

    await test.step("User validates the cart page", async () => {
      await pm.onCartPage().validateIfOnCartPage();
    });

    await test.step("User verifies that all items are in the cart", async () => {
      cartItems = await pm.onCartPage().getCartItemNames();
      expect(cartItems.length).toBe(itemsToAdd.length);
    });

    await test.step("User removes one item (second item in the list)", async () => {
      itemToRemove = itemsToAdd[1];
      await pm.onCartPage().removeItemByName(itemToRemove);
    });

    await test.step("User verifies that the cart has the correct number of items", async () => {
      let itemCountAfterRemoval = await pm.onCartPage().getCartItemCount();
      expect(itemCountAfterRemoval).toBe(itemsToAdd.length - 1);
    });

    await test.step("User verifies that the cart badge reflects new count", async () => {
      let badgeCount = await pm.onCartPage().getCartBadgeCount();
      expect(badgeCount).toBe(itemsToAdd.length - 1);
    });

    await test.step("User verifies that the correct item was removed", async () => {
      cartItems = await pm.onCartPage().getCartItemNames();
      expect(cartItems).not.toContain(itemToRemove);
    });

    await test.step("User verifies that remaining items are still in cart", async () => {
      remainingItems = itemsToAdd.filter((item) => item !== itemToRemove);
      for (const item of remainingItems) {
        expect(cartItems).toContain(item);
      }
    });

    await test.step("User verifies that the count of remaining items matches expected", async () => {
      expect(cartItems.length).toBe(remainingItems.length);
    });
  });
});
