import { defineConfig } from "@playwright/test";
import * as process from "process";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 300000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Run tests in parallel on CI */
  workers: undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [["blob"]]
    : [
        ["list"],
        ["json", { outputFile: "test-results/results.json" }],
        ["html", { outputFolder: "html-report", open: "always" }],
      ],
  expect: { timeout: 20000 },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    video: "on-first-retry",
    screenshot: "only-on-failure",
    trace: "on",
    baseURL: "https://www.saucedemo.com",
    actionTimeout: 20000,
    navigationTimeout: 15000,
    launchOptions:
      process.env.BROWSER === "chromium" ? { args: ["--start-maximized"] } : {},
  },

  /**
   * Test Projects Configuration
   *
   * Browser Projects (run all POM tests):
   * - chromium: Runs all tests in Chromium with maximized window
   * - firefox: Runs all tests in Firefox with 1920x1200 viewport
   * - webkit: Runs all tests in WebKit with 1920x1200 viewport
   *
   * Feature-Specific Projects (Chromium):
   * - checkout-flow: End-to-end checkout test
   * - cart-management: Cart operations and validation
   * - product-sorting: Product filtering and sorting
   *
   * Feature-Specific Projects (Firefox):
   * - checkout-flow-firefox
   * - cart-management-firefox
   * - product-sorting-firefox
   */
  projects: [
    // ============================================
    // Browser Projects (All POM Tests)
    // ============================================
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        viewport: null, // Allows --start-maximized to work
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
      testIgnore: [
        "**/test1.spec.ts",
        "**/tests/seed.spec.ts",
        "**/tests/authentication/**",
      ],
    },
    {
      name: "firefox",
      use: {
        browserName: "firefox",
        viewport: { width: 1920, height: 1200 },
      },
      testIgnore: [
        "**/test1.spec.ts",
        "**/tests/seed.spec.ts",
        "**/tests/authentication/**",
      ],
    },
    {
      name: "webkit",
      use: {
        browserName: "webkit",
        viewport: { width: 1920, height: 1200 },
      },
      testIgnore: [
        "**/test1.spec.ts",
        "**/tests/seed.spec.ts",
        "**/tests/authentication/**",
      ],
    },

    // ============================================
    // Legacy Test (Non-POM)
    // ============================================
    {
      name: "test1",
      testMatch: "**/test1.spec.ts",
      use: {
        browserName: "chromium",
        viewport: null, // Allows --start-maximized to work
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },

    // ============================================
    // Feature-Specific Projects (Chromium)
    // ============================================
    {
      name: "checkout-flow-chromium",
      testMatch: "**/01-checkout.spec.ts",
      use: {
        browserName: "chromium",
        viewport: null, // Allows --start-maximized to work
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },
    {
      name: "cart-management-chromium",
      testMatch: "**/02-cart-management.spec.ts",
      use: {
        browserName: "chromium",
        viewport: null, // Allows --start-maximized to work
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },
    {
      name: "product-sorting-chromium",
      testMatch: "**/03-product-sorting.spec.ts",
      use: {
        browserName: "chromium",
        viewport: null, // Allows --start-maximized to work
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },

    // ============================================
    // Feature-Specific Projects (Firefox)
    // ============================================
    {
      name: "checkout-flow-firefox",
      testMatch: "**/01-checkout.spec.ts",
      use: {
        browserName: "firefox",
        viewport: { width: 1920, height: 1200 },
      },
    },
    {
      name: "cart-management-firefox",
      testMatch: "**/02-cart-management.spec.ts",
      use: {
        browserName: "firefox",
        viewport: { width: 1920, height: 1200 },
      },
    },
    {
      name: "product-sorting-firefox",
      testMatch: "**/03-product-sorting.spec.ts",
      use: {
        browserName: "firefox",
        viewport: { width: 1920, height: 1200 },
      },
    },
    // ============================================
    // Feature-Specific Projects (WebKit)
    // ============================================
    {
      name: "checkout-flow-webkit",
      testMatch: "**/01-checkout.spec.ts",
      use: {
        browserName: "webkit",
        viewport: { width: 1920, height: 1200 },
      },
    },
    {
      name: "cart-management-webkit",
      testMatch: "**/02-cart-management.spec.ts",
      use: {
        browserName: "webkit",
        viewport: { width: 1920, height: 1200 },
      },
    },
    {
      name: "product-sorting-webkit",
      testMatch: "**/03-product-sorting.spec.ts",
      use: {
        browserName: "webkit",
        viewport: { width: 1920, height: 1200 },
      },
    },
  ],
});
