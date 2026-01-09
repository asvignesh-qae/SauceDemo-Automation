import { test, expect } from "../fixtures/auth-fixture";

test.describe("Product Sorting", () => {
  test("Test 3: User can sort items using all four sorting methods", async ({ authenticatedPage: pm }) => {
    await test.step("User verifies that the cart is empty", async () => {
      expect(await pm.onInventoryPage().getCartItemCount()).toBe(0);
    });

    await test.step("User validates that items are sorted from A to Z (Name ascending - default)", async () => {
      await pm.onInventoryPage().sortBy("az");
      let productNames: string[] = await pm.onInventoryPage().getProductNames();
      const sortedAZ: string[] = [...productNames].sort((a, b) => a.localeCompare(b));
      expect(productNames).toEqual(sortedAZ);
    });

    await test.step("User validates that items are sorted from Z to A (Name descending)", async () => {
      await pm.onInventoryPage().sortBy("za");
      let productNames: string[] = await pm.onInventoryPage().getProductNames();
      const sortedAZ: string[] = [...productNames].sort((a, b) => b.localeCompare(a));
      expect(productNames).toEqual(sortedAZ);
    });

    await test.step("User validates that items are sorted from Low to High (Price ascending)", async () => {
      await pm.onInventoryPage().sortBy("lohi");
      let productPrices: number[] = await pm.onInventoryPage().getProductPrices();
      const sortedLowHigh: number[] = [...productPrices].sort((a, b) => a - b);
      expect(productPrices).toEqual(sortedLowHigh);
      expect(productPrices[0]).toBeLessThanOrEqual(
        productPrices[productPrices.length - 1]
      );
    });

    await test.step("User validates that items are sorted from High to Low (Price descending)", async () => {
      await pm.onInventoryPage().sortBy("hilo");
      let productPrices: number[] = await pm.onInventoryPage().getProductPrices();
      const sortedHighLow: number[] = [...productPrices].sort((a, b) => b - a);
      expect(productPrices).toEqual(sortedHighLow);
      expect(productPrices[0]).toBeGreaterThanOrEqual(
        productPrices[productPrices.length - 1]
      );
    });

  });
});
