import { test as base } from './page-fixture';
import { PageManager } from '../page-objects/PageManager';
import { credentials } from '@utils/credentials';

type AuthFixtures = {
  authenticatedPage: PageManager;
};

/**
 * Extended fixture that provides authenticated session
 * All tests using this fixture will start logged in on the inventory page
 */
export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ pmPage }, use) => {
    const pm = new PageManager(pmPage);

    // Perform login
    await pm.onLoginPage().goto();
    await pm.onLoginPage().validateLoginPage();
    await pm.onLoginPage().login(
      credentials.standardUser.username,
      credentials.standardUser.password
    );
    await pm.onInventoryPage().validateInventoryPage();

    // Provide authenticated PageManager to tests
    await use(pm);
  }
});

export { expect } from '@playwright/test';
