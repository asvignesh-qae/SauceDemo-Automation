# SauceDemo Automation Framework

![CI](https://github.com/asvignesh-qae/SauceDemo-Automation/actions/workflows/playwright.yml/badge.svg)

A modern, maintainable test automation framework for SauceDemo using **Playwright** and **TypeScript**.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Cases](#test-cases)
- [Project Structure](#project-structure)
- [Best Practices](#best-practices)
- [CI/CD Integration](#cicd-integration)
- [AI-Powered Testing with MCP](MCP_TESTING.md) 🤖

---

## 🎯 Project Overview

This automation framework implements three comprehensive test scenarios for the SauceDemo e-commerce application:

1. **Purchase Flow**: Complete end-to-end purchase with multiple items
2. **Cart Management**: Add/remove items and verify cart integrity
3. **Product Sorting**: Validate all four sorting mechanisms

### Key Features

1. ✅ **SOLID Principles** - 82% compliance with clean architecture (see [Architecture](#-architecture))
2. ✅ **Page Object Model (POM)** - Maintainable and scalable architecture
3. ✅ **TypeScript** - Type-safe code with excellent IDE support
4. ✅ **Independent Tests** - Each test is isolated and can run independently
5. ✅ **Secure Credentials** - Environment-based credential management
6. ✅ **Cross-Browser** - Tests run on Chromium, Firefox, and WebKit
7. ✅ **Detailed Reporting** - HTML and JSON reports with screenshots/videos
8. ✅ **Reusable Fixtures** - Authenticated session fixture eliminates login boilerplate
9. ✅ **AI-Powered Testing** - MCP agents for test planning, generation, and healing (see [MCP_TESTING.md](MCP_TESTING.md))
10. ✅ **Accessibility Testing** - Integrated a11y testing using axe-core and Playwright for WCAG compliance

---

## 🏗️ Architecture

### SOLID Principles

This framework strictly follows **SOLID principles** for clean, maintainable, and scalable test automation:

#### ✅ **S - Single Responsibility Principle**

Each class and module has **ONE clearly defined responsibility**:

**Page Objects** - Each handles only its specific page:

- `LoginPage` → Login operations only
- `InventoryPage` → Product listing and cart operations
- `CartPage` → Shopping cart management
- `CheckoutStepOnePage` → Checkout form handling
- `CheckoutStepTwoPage` → Order review and confirmation
- `CheckoutCompletePage` → Order completion verification

**Utilities** - Separated by concern:

- `credentials.ts` → Credential management only
- `testData.ts` → Test data management only

**Fixtures** - Each has specific purpose:

- `page-fixture.ts` → Provides page and time logging
- `auth-fixture.ts` → Provides authenticated session

**Test Files** - Each focuses on single feature:

- `01-checkout.spec.ts` → Purchase flow only
- `02-cart-management.spec.ts` → Cart operations only
- `03-product-sorting.spec.ts` → Sorting functionality only

**Benefits**: Easy maintenance, clear code organization, minimal impact from changes

---

#### ✅ **O - Open/Closed Principle**

Classes are **open for extension, closed for modification**:

**AbstractPage Base Methods**:

```typescript
// AbstractPage provides extensible base functionality
protected async validatePage(
  expectedTitle: string,
  urlPattern: RegExp,
  expectedHeading?: string
): Promise<void>

protected async getBadgeCount(
  cartBadgeLocator: Locator
): Promise<number>
```

**Page Objects Extend Without Modifying**:

```typescript
// LoginPage extends functionality without modifying AbstractPage
export class LoginPage extends AbstractPage {
  async validateLoginPage(): Promise<void> {
    await this.validatePage("Swag Labs", /saucedemo\.com/);
  }
}
```

**Fixture Extension**:

```typescript
// auth-fixture extends page-fixture without modifying it
export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ pmPage }, use) => {
    // New functionality added via extension
  },
});
```

**Benefits**: New features added without changing existing code, reduced regression risk

---

#### ✅ **L - Liskov Substitution Principle**

**Child classes properly substitute parent classes**:

All page objects extend `AbstractPage` and can be used interchangeably:

```typescript
// Any page object can substitute AbstractPage
export class LoginPage extends AbstractPage {}
export class InventoryPage extends AbstractPage {}
export class CartPage extends AbstractPage {}

// All inherit the same 'page' property and methods
function navigatePage(pageObject: AbstractPage) {
  pageObject.page.goto("/url"); // Works for ALL page objects
}
```

**Key Benefits**:

- All page objects share common `page` property from AbstractPage
- All can use `validatePage()` and `getBadgeCount()` methods
- No broken contracts or unexpected behavior
- Proper inheritance hierarchy eliminates code duplication

---

### Design Patterns

This framework implements several industry-standard design patterns:

#### 1. Facade Pattern

The `PageManager` class serves as a Facade, providing a simplified interface to access all page objects:

```typescript
// Instead of instantiating each page object individually:
const pm = new PageManager(page);
await pm.onLoginPage().login(username, password);
await pm.onInventoryPage().addItemToCartByName("Backpack");
await pm.onCartPage().proceedToCheckout();
```

Tests don't directly create page objects:

```typescript
// Good - using abstraction
await pm.onLoginPage().login(username, password);

// Bad - direct instantiation avoided
const loginPage = new LoginPage(page);
```

- **Benefits**: Centralized page object management, reduced test coupling, simplified test code means easier testing, flexible architecture.
- **Location**: `page-objects/PageManager.ts`

#### 2. Page Object Model (POM)

Encapsulates page-specific elements and interactions into reusable classes:

- **Base Class**: `AbstractPage` provides common functionality
- **Specialized Pages**: `LoginPage`, `InventoryPage`, `CartPage`, `CheckoutStepOnePage`, etc.
- **Benefits**: UI abstraction, reusable components, easier maintenance when UI changes

#### 3. Test Fixtures Pattern

Provides reusable test setup and teardown using Playwright's fixture system:

- **Base Fixture** (`page-fixture.ts`):
  - `pmPage` fixture provides page object access
  - `timeLogger` fixture automatically logs test start/end times

- **Authenticated Fixture** (`auth-fixture.ts`):
  - `authenticatedPage` fixture provides pre-authenticated session
  - Automatically logs in and navigates to inventory page
  - Eliminates login boilerplate from all tests

**Benefits**: Reduced boilerplate, consistent test setup, automatic cleanup, faster test execution

#### 4. Utility Pattern

Centralized credential and test data management:

- **Credentials**: Secure, environment-based credential management (`utils/credentials.ts`)
- **Test Data**: Centralized product, checkout, and validation data (`utils/testData.ts`)
- **Benefits**: Single source of truth, easy configuration updates, no hardcoded values

---

### Architecture Summary

| Principle                 | Compliance | Key Implementation                                                 |
| ------------------------- | ---------- | ------------------------------------------------------------------ |
| **Single Responsibility** | ✅ 95%     | Each class has one clear purpose                                   |
| **Open/Closed**           | ✅ 85%     | AbstractPage enables extension without modification                |
| **Liskov Substitution**   | ✅ 95%     | Proper inheritance hierarchy, all page objects extend AbstractPage |

**Key Strengths**:

- ✅ Clean separation of concerns across all modules
- ✅ Proper inheritance hierarchy eliminates code duplication
- ✅ Extensible architecture via base class methods
- ✅ Fixture-based dependency injection for tests
- ✅ ~150+ lines of duplicate code eliminated through refactoring

---

### Tech Stack

- **Playwright**: ^1.48.0
- **TypeScript**: ^5.6.0
- **Node.js**: 18+ (recommended)
- **dotenv**: Environment variable management
- **MCP (Model Context Protocol)**: AI-powered test development with Claude agents - [Learn more](MCP_TESTING.md)

---

## 📦 Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** (optional, for version control)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone [<repository-url>](https://github.com/asvignesh-qae/SauceDemo-Automation.git)
```

### 2. Install Dependencies

```bash
npm install
```

This installs:

- Playwright and its browsers
- TypeScript compiler
- Required dependencies

### 3. Install Playwright Browsers

```bash
npx playwright install
```

---

## ⚙️ Configuration

### Environment Variables

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. The `.env` file contains:

```env
STANDARD_USER_USERNAME=username
STANDARD_USER_PASSWORD=password
```

Now replace the username and password with the intended credentials

> **Security Note**: Never commit `.env` to version control. It's already in `.gitignore`.

### Playwright Configuration

The `playwright.config.ts` includes:

- **Base URL**: https://www.saucedemo.com
- **Browsers**: Chromium, Firefox, WebKit
- **Parallel Execution**: Enabled
- **Retries**: 2 retries in CI, 0 locally
- **Screenshots**: On failure
- **Videos**: Retained on failure
- **Traces**: On first retry

---

## 🧪 Running Tests

### Run All Tests

```bash
npm test
```

### Run All Tests for Specific Browser

```bash
npm run test:all:chromium   # Run all tests in Chromium
npm run test:all:firefox    # Run all tests in Firefox
npm run test:all:webkit     # Run all tests in WebKit
```

### Run Tests in Headed Mode (See Browser)

```bash
npm run test:all:chromium:headed   # Chromium with visible browser
npm run test:all:firefox:headed    # Firefox with visible browser
npm run test:all:webkit:headed     # WebKit with visible browser
```

### Run Tests in Headless Mode (No Physical Browser)

```bash
npm run test:all:chromium   # Chromium browser hidden
npm run test:all:firefox    # Firefox browser hidden
npm run test:all:webkit     # WebKit browser hidden
```

### Run Accessibility Tests

```bash
npm run test:a11y                # Run in headless mode
npm run test:a11y:headed         # Run with visible browser
npm run test:a11y:report         # Run and show the HTML report
```

### Run Individual Feature Tests

```bash
# Chromium
npm run test:checkout:chromium
npm run test:cart:chromium
npm run test:sorting:chromium

# Firefox
npm run test:checkout:firefox
npm run test:cart:firefox
npm run test:sorting:firefox

# WebKit
npm run test:checkout:webkit
npm run test:cart:webkit
npm run test:sorting:webkit
```

### Run Legacy Test

```bash
npm run test1                # Run test1.spec.ts
npm run test1:headed         # Run test1 with visible browser
```

### Run Tests in UI Mode (Interactive)

```bash
npx playwright test --ui
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

### Run Specific Test File

```bash
npx playwright test tests/01-checkout.spec.ts
npx playwright test tests/02-cart-management.spec.ts
npx playwright test tests/03-product-sorting.spec.ts
```

### View Test Report

```bash
npx playwright show-report
```

---

## 📝 Test Cases

### Test 1: Purchase Flow (`01-checkout.spec.ts`)

**Objective**: Verify users can add items to cart and complete purchase

**Steps**:

1. Login as standard_user
2. Add 3 items to cart (Backpack, Bike Light, Bolt T-Shirt)
3. Verify cart badge shows correct count
4. Navigate to cart
5. Verify all items are present
6. Proceed to checkout
7. Fill shipping information
8. Complete purchase
9. Verify order confirmation

**Expected Result**: Order completes successfully with confirmation message

---

### Test 2: Cart Management (`02-cart-management.spec.ts`)

**Objective**: Verify cart correctly updates when items are removed

**Steps**:

1. Login as standard_user
2. Add 4 items to cart
3. Verify cart badge shows count of 4
4. Navigate to cart
5. Remove one item (Bike Light)
6. Verify cart count decreases to 3
7. Verify cart badge reflects new count
8. Verify removed item is gone
9. Verify remaining items are still present

**Expected Result**: Cart accurately reflects changes after item removal

---

### Test 3: Product Sorting (`03-product-sorting.spec.ts`)

**Objective**: Verify all four sorting options work correctly

**Steps**:

1. Login as standard_user
2. Test "Name (A to Z)" sorting
   - Verify products are alphabetically sorted
3. Test "Name (Z to A)" sorting
   - Verify products are reverse alphabetically sorted
4. Test "Price (low to high)" sorting
   - Verify products are sorted by ascending price
5. Test "Price (high to low)" sorting
   - Verify products are sorted by descending price

**Expected Result**: All four sorting methods correctly reorder products

---

### Test 4: Accessibility Audit (`accessibility/vignesh-as-dev-a11y.spec.ts`)

**Objective**: Verify the accessibility of https://vignesh-as.dev against WCAG 2.1 Level A & AA guidelines.

**Key Suites**:

1. **Automated axe-core Scan**: Reports all violations, fails on critical/serious.
2. **Page Structure**: Validates landmarks, headings, and language.
3. **Navigation & Focus**: Checks ARIA labels, focus states, and tab order.
4. **Images & Media**: Verifies descriptive alt text.
5. **Forms**: Ensures inputs and buttons are properly labeled and reachable.
6. **Responsive / Reflow**: Tests content reflow at 320px and 375px without horizontal scroll.

**Expected Result**: Generates a detailed accessibility report and ensures compliance with WCAG standards.

---

## 📂 Project Structure

```
SauceDemo-Automation/
├── .env                           # Environment variables (credentials)
├── .env.example                   # Template for environment variables
├── .gitignore                     # Git ignore rules
├── .mcp.json                      # MCP agent configuration for Claude (see MCP_TESTING.md)
├── playwright.config.ts           # Playwright configuration
├── package.json                   # Project dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── README.md                      # This file
├── MCP_TESTING.md                 # AI-Powered Testing with MCP guide
├── QUICK_START.md                 # Quick start guide
│
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions CI/CD workflow
│
├── fixtures/
│   ├── page-fixture.ts            # Base test fixtures (page + time logging)
│   └── auth-fixture.ts            # Authenticated session fixture
│
├── page-objects/                  # Page Object Model
│   ├── AbstractPage.ts            # Abstract base class
│   ├── LoginPage.ts               # Login page interactions
│   ├── InventoryPage.ts           # Product listing page
│   ├── CartPage.ts                # Shopping cart page
│   └── CheckoutPage.ts            # Checkout flow pages
│
├── specs/                         # Test plans generated by Planner agent
│   └── *.plan.md                  # Test plan documents
│
├── tests/                         # Test specifications
│   ├── test1.spec.ts              # Legacy test (non-POM)
│   ├── 01-checkout.spec.ts        # Checkout flow tests
│   ├── 02-cart-management.spec.ts # Cart management tests
│   ├── 03-product-sorting.spec.ts # Product sorting tests
│   ├── seed.spec.ts               # Seed file for agent-based testing
│   └── authentication/            # Authentication test suite
│       └── login-standard-user.spec.ts
│
└── utils/
    └── credentials.ts             # Credential management utility
```

---

## ✅ Best Practices Implemented

### 1. **Secure Credential Management**

- Credentials stored in `.env` file
- Never hardcoded in test files
- `.env` excluded from version control

### 2. **Page Object Model**

- Logical separation of page elements and actions
- Promotes code reuse and maintainability
- Easy to update when UI changes

### 3. **Independent Test Isolation**

- Each test has its own setup (login)
- Tests don't depend on each other
- Failures are isolated

### 4. **Type Safety with TypeScript**

- Compile-time error detection
- Better IDE autocomplete
- Self-documenting code

### 5. **Proper Waiting Strategies**

- Uses Playwright's auto-waiting
- Explicit waits for URL changes
- No arbitrary sleep() calls (except for sorting animation)

### 6. **Comprehensive Assertions**

- Multiple verification points per test
- Validates both UI state and data
- Clear failure messages

### 7. **Clean Code & SOLID Principles**

This framework strictly adheres to **SOLID principles** for maintainable, scalable test automation:

- **S - Single Responsibility**: Each class/module has one clear purpose
- **O - Open/Closed**: Extensible via inheritance without modifying existing code
- **L - Liskov Substitution**: Proper inheritance hierarchy with AbstractPage
- **I - Interface Segregation**: Focused, specific methods per page object
- **D - Dependency Inversion**: Fixture-based dependency injection

See [Architecture > SOLID Principles](#solid-principles) for comprehensive implementation details.

**Additional Clean Code Practices**:

- **Descriptive Naming**: Clear, self-documenting method and variable names
- **DRY (Don't Repeat Yourself)**: Reusable page objects, fixtures, and utilities
- **Facade Pattern**: `PageManager` provides unified access to all page objects
- **Type Safety**: Full TypeScript with strict mode enabled

---

## 🔄 CI/CD Integration

### GitHub Actions Workflow

This project includes a production-ready GitHub Actions workflow at `.github/workflows/playwright.yml` with advanced features:

#### Key Features:

- **Test Sharding**: Tests run in parallel across 4 shards for 4x faster execution
- **Browser Caching**: Playwright browsers are cached to reduce install time
- **NPM Caching**: Dependencies are cached for faster builds
- **Blob Reports**: Individual shard reports are merged into a single HTML report
- **Smart Artifacts**: Test results (7 days) and HTML reports (30 days) with different retention periods
- **Fail-Safe**: All shards run even if one fails (`fail-fast: false`)

#### Workflow Overview:

```yaml
name: Playwright Tests

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
  schedule:
    # Runs every 8 hours at minute 0 (00:00, 08:00, 16:00, 24:00 UTC)
    - cron: "0 */8 * * *"
  workflow_dispatch: # Allows manual triggering from GitHub Actions UI

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        shardIndex: [1, 2, 3, 4]
        shardTotal: [4]
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Cache Playwright Browsers
        uses: actions/cache@v4
        with:
          path: ~/.cache/ms-playwright
          key: ${{ runner.os }}-playwright-${{ hashFiles('**/package-lock.json') }}

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npx playwright test --project=chromium --project=firefox --project=webkit --project=test1 --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
        env:
          CI: true

      - name: Upload test results
        if: ${{ !cancelled() }}
        uses: actions/upload-artifact@v4
        with:
          name: test-results-${{ matrix.shardIndex }}
          path: test-results/

  merge-reports:
    if: ${{ !cancelled() }}
    needs: [test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - name: Download blob reports
        uses: actions/download-artifact@v4
        with:
          pattern: blob-report-*
          merge-multiple: true
      - name: Merge into HTML Report
        run: npx playwright merge-reports --reporter html ./all-blob-reports
      - name: Upload HTML report
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

#### Workflow Triggers:

The workflow automatically runs on:

- **Push Events**: Every push to `main` or `master` branches
- **Pull Requests**: Every pull request targeting `main` or `master`
- **Scheduled**: Every 8 hours (at 00:00, 08:00, 16:00, and 24:00 UTC) using cron schedule `0 */8 * * *`
- **Manual Trigger**: Can be triggered manually from the GitHub Actions UI using `workflow_dispatch`

The scheduled runs help ensure:

- Continuous monitoring of application stability
- Early detection of issues that may occur due to external dependencies
- Regular validation that tests remain stable over time
- Proactive identification of flaky tests

#### Environment Setup:

Store credentials as GitHub Secrets:

1. Go to repository Settings → Secrets and variables → Actions
2. Add secrets:
   - `STANDARD_USER_USERNAME`
   - `STANDARD_USER_PASSWORD`

---

## 📊 Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

The report includes:

- Test execution status
- Screenshots of failures
- Videos of test runs (captured on first retry)
- Execution traces for debugging

### Viewing Specific Traces

To view a specific test trace:

```bash
npx playwright show-trace test-results/<test-name>/trace.zip
```

### Report Locations

- **Local runs**: `html-report/` (opens automatically)
- **CI runs**: Download from GitHub Actions artifacts
  - Individual shard results: `test-results-1`, `test-results-2`, etc.
  - Merged HTML report: `playwright-report` (retained for 30 days)

---

## 🐛 Troubleshooting

### Tests Fail with "Credentials not found"

Ensure `.env` file exists with correct credentials:

```bash
cp .env.example .env
```

### Browser Not Installed

Install Playwright browsers:

```bash
npx playwright install
```

### Port Already in Use

Kill the process using the port:

```bash
# Linux/Mac
lsof -ti:PORT | xargs kill -9

# Windows
netstat -ano | findstr :PORT
taskkill /PID <PID> /F
```

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests: `npm test`
4. Submit pull request

---

**Happy Testing! 🚀**
