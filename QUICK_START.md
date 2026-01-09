# 🚀 Quick Start Guide

Get up and running with the SauceDemo automation framework in under 5 minutes!

## Prerequisites

- Node.js 18+ installed ([Download](https://nodejs.org/))
- Basic terminal/command line knowledge

---

## ⚡ Quick Setup (3 Steps)

### Step 1: Install Dependencies

```bash
npm install
```

This installs Playwright, TypeScript, and all required dependencies.

### Step 2: Install Playwright Browsers

```bash
npx playwright install
```

This downloads Chromium, Firefox, and WebKit browsers.

### Step 3: Run Tests!

```bash
npm test
```

That's it! Your tests are running. 🎉

---

## 📝 What Just Happened?

The framework automatically:
1. ✅ Loaded credentials from `.env` file
2. ✅ Logged in as standard_user
3. ✅ Executed all 3 test scenarios
4. ✅ Generated HTML report with results

---

## 🎯 Run Individual Tests

### Test 1: Checkout Flow
```bash
npx playwright test tests/01-checkout.spec.ts
```

### Test 2: Cart Management
```bash
npx playwright test tests/02-cart-management.spec.ts
```

### Test 3: Product Sorting
```bash
npx playwright test tests/03-product-sorting.spec.ts
```

### Legacy Test (test1)
```bash
npm run test1
```

---

## 👀 Want to See the Browser?

Run all tests in headed mode for a specific browser:

```bash
npm run test:all:chromium:headed   # Chrome browser
npm run test:all:firefox:headed    # Firefox browser
npm run test:all:webkit:headed     # Safari browser
```

Or run individual feature tests in headed mode:

```bash
npm run test:checkout:chromium:headed
npm run test:cart:firefox:headed
npm run test:sorting:webkit:headed
```

Or use the interactive UI mode:

```bash
npx playwright test --ui
```

---

## 📊 View Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

This opens an HTML report in your browser showing:
- Pass/fail status for each test
- Screenshots of failures
- Video recordings (on first retry)
- Execution traces

---

## 🐛 Debugging Tests

Run in debug mode with step-by-step execution:

```bash
npx playwright test --debug
```

Or debug a specific test file:

```bash
npx playwright test tests/01-checkout.spec.ts --debug
```

---

## 🎨 Interactive Test Runner

For an easy-to-use interface with visual test selection and execution:

```bash
npx playwright test --ui
```

---

## 📁 Project Structure (Quick Reference)

```
TulipTakeHome/
├── tests/                           # Your test files
│   ├── test1.spec.ts               # Legacy test
│   ├── 01-checkout.spec.ts         # Checkout flow tests
│   ├── 02-cart-management.spec.ts  # Cart operations tests
│   └── 03-product-sorting.spec.ts  # Product sorting tests
│
├── pages/                           # Page Object Models
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── .github/workflows/               # CI/CD Configuration
│   └── playwright.yml              # GitHub Actions workflow
│
├── playwright.config.ts             # Playwright configuration
└── README.md                        # Full documentation
```

---

## ❓ Common Questions

### Q: Where are the test credentials?

**A:** In the `.env` file. They're loaded automatically:
- Username: `username`
- Password: `password`

### Q: How do I run all the tests only one browser?

**A:** Use these commands:
```bash
npm run test:all:chromium   # Chromium only
npm run test:all:firefox    # Firefox only
npm run test:all:webkit     # WebKit (Safari) only
```

### Q: Tests are failing, what do I do?

**A:**
1. Check the HTML report: `npx playwright show-report`
2. Look at screenshots and traces in `test-results/`
3. Run in debug mode: `npx playwright test --debug`
4. View execution traces: `npx playwright show-trace test-results/<trace-file>.zip`

### Q: Can I run tests in parallel?

**A:** Yes! Tests already run in parallel by default. Configure in `playwright.config.ts`.

---

## 🎓 Next Steps

1. ✅ Read the full [README.md](README.md) for detailed documentation
2. ✅ Explore the Page Objects in `pages/` folder
3. ✅ Review the CI/CD workflow in `.github/workflows/playwright.yml`
4. ✅ Customize `playwright.config.ts` for your needs
5. ✅ Check out the available npm scripts in `package.json`

---

## 💡 Pro Tips

**Tip 1**: Use `--headed` flag to watch tests run in the browser
**Tip 2**: Use `--ui` flag for interactive test selection and debugging
**Tip 3**: Check `playwright-report/` for detailed HTML results
**Tip 4**: Use `--debug` flag to pause and step through tests
**Tip 5**: Run specific projects with `--project=chromium` or `--project=firefox`
**Tip 6**: CI workflow uses test sharding for 4x faster parallel execution
**Tip 7**: WebKit runs headless on CI but headed locally for debugging

---

## 🆘 Need Help?

- 📖 Full docs: [README.md](README.md)
- 🌐 Playwright docs: https://playwright.dev
- 🐛 Having issues? Check the troubleshooting section in README.md

---

**Happy Testing! 🧪✨**

---

*Time to first test run: < 5 minutes ⏱️*
