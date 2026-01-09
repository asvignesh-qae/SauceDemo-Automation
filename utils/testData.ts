/**
 * Test Data Management Utility
 * 
 * Centralized location for all test data used across the framework.
 * Makes it easy to update test data without modifying test files.
 */

export const testData = {
  // User information for checkout
  checkout: {
    firstName: 'First Name',
    lastName: 'Last Name',
    postalCode: '12345',
  },

  // Product names available on the site
  products: {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light',
    boltTShirt: 'Sauce Labs Bolt T-Shirt',
    fleeceJacket: 'Sauce Labs Fleece Jacket',
    onesie: 'Sauce Labs Onesie',
    tShirtRed: 'Test.allTheThings() T-Shirt (Red)',
  },

  // Sort options
  sorting: {
    nameAsc: 'az' as const,
    nameDesc: 'za' as const,
    priceLowHigh: 'lohi' as const,
    priceHighLow: 'hilo' as const,
  },
};

/**
 * Helper function to get multiple product names
 */
export const getProducts = (count: number): string[] => {
  const allProducts = Object.values(testData.products);
  return allProducts.slice(0, Math.min(count, allProducts.length));
};

/**
 * Helper function to get random product
 */
export const getRandomProduct = (): string => {
  const products = Object.values(testData.products);
  return products[Math.floor(Math.random() * products.length)];
};

