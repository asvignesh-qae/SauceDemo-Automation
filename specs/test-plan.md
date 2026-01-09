# SauceDemo Application Test Plan

## Application Overview

The SauceDemo application (https://www.saucedemo.com) is an e-commerce demo site for testing automation. It features user authentication, product browsing, shopping cart management, and a complete checkout flow. The application provides multiple test users (standard_user, locked_out_user, problem_user, performance_glitch_user, error_user, visual_user) to simulate different scenarios. The product catalog includes 6 items with prices ranging from $7.99 to $49.99, with functionality for sorting, adding to cart, and completing purchases.

## Test Scenarios

### 1. Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with standard user

**File:** `tests/authentication/login-standard-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
  2. Verify the login page displays with username and password fields
  3. Enter 'standard_user' in the username field
  4. Enter '' in the password field
  5. Click the Login button
  6. Verify successful redirect to the products page (/inventory.html)
  7. Verify the page title shows 'Products'

**Expected Results:**
  - Login is successful and user is redirected to the inventory page
  - Products page displays with all 6 products visible
  - Cart icon is visible in the header
  - Menu button is accessible

#### 1.2. Login with locked out user

**File:** `tests/authentication/login-locked-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
  2. Enter 'locked_out_user' in the username field
  3. Enter '' in the password field
  4. Click the Login button
  5. Verify error message is displayed
  6. Verify user remains on the login page

**Expected Results:**
  - Error message 'Epic sadface: Sorry, this user has been locked out.' is displayed
  - User is not redirected and remains on login page
  - Username and password fields are still visible

#### 1.3. Login with invalid credentials

**File:** `tests/authentication/login-invalid-credentials.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
  2. Enter 'invalid_user' in the username field
  3. Enter 'wrong_password' in the password field
  4. Click the Login button
  5. Verify error message is displayed

**Expected Results:**
  - Error message indicating invalid credentials is displayed
  - User remains on the login page
  - Login form is still accessible

#### 1.4. Login with empty credentials

**File:** `tests/authentication/login-empty-credentials.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
  2. Leave username field empty
  3. Leave password field empty
  4. Click the Login button
  5. Verify error message for required username is displayed

**Expected Results:**
  - Error message 'Epic sadface: Username is required' is displayed
  - User remains on the login page

#### 1.5. Login with empty password

**File:** `tests/authentication/login-empty-password.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
  2. Enter 'standard_user' in the username field
  3. Leave password field empty
  4. Click the Login button
  5. Verify error message for required password is displayed

**Expected Results:**
  - Error message 'Epic sadface: Password is required' is displayed
  - User remains on the login page

#### 1.6. Logout functionality

**File:** `tests/authentication/logout.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
  2. Login with 'standard_user' and ''
  3. Verify successful login to products page
  4. Click the menu button to open sidebar
  5. Click the 'Logout' link
  6. Verify redirect to login page
  7. Verify user cannot access products page without re-authentication

**Expected Results:**
  - User is successfully logged out
  - User is redirected to the login page
  - Session is cleared
  - Direct navigation to /inventory.html redirects to login

### 2. Product Sorting

**Seed:** `tests/seed.spec.ts`

#### 2.1. Sort products by name A to Z

**File:** `tests/product-sorting/sort-name-a-to-z.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Verify the default sort is 'Name (A to Z)'
  3. Verify products are displayed in alphabetical order
  4. Check the order: Sauce Labs Backpack, Sauce Labs Bike Light, Sauce Labs Bolt T-Shirt, Sauce Labs Fleece Jacket, Sauce Labs Onesie, Test.allTheThings() T-Shirt (Red)

**Expected Results:**
  - Products are sorted alphabetically from A to Z
  - Sort dropdown shows 'Name (A to Z)' as selected
  - Product order matches alphabetical sequence

#### 2.2. Sort products by name Z to A

**File:** `tests/product-sorting/sort-name-z-to-a.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Click the sort dropdown
  3. Select 'Name (Z to A)' option
  4. Verify products are reordered in reverse alphabetical order
  5. Check the order: Test.allTheThings() T-Shirt (Red), Sauce Labs Onesie, Sauce Labs Fleece Jacket, Sauce Labs Bolt T-Shirt, Sauce Labs Bike Light, Sauce Labs Backpack

**Expected Results:**
  - Products are sorted alphabetically from Z to A
  - Sort dropdown shows 'Name (Z to A)' as selected
  - Product order is reversed from the default

#### 2.3. Sort products by price low to high

**File:** `tests/product-sorting/sort-price-low-to-high.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Click the sort dropdown
  3. Select 'Price (low to high)' option
  4. Verify products are reordered by ascending price
  5. Check the order: Sauce Labs Onesie ($7.99), Sauce Labs Bike Light ($9.99), Sauce Labs Bolt T-Shirt ($15.99), Test.allTheThings() T-Shirt ($15.99), Sauce Labs Backpack ($29.99), Sauce Labs Fleece Jacket ($49.99)

**Expected Results:**
  - Products are sorted by price from lowest to highest
  - Sort dropdown shows 'Price (low to high)' as selected
  - Prices are in ascending order: $7.99, $9.99, $15.99, $15.99, $29.99, $49.99

#### 2.4. Sort products by price high to low

**File:** `tests/product-sorting/sort-price-high-to-low.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Click the sort dropdown
  3. Select 'Price (high to low)' option
  4. Verify products are reordered by descending price
  5. Check the order: Sauce Labs Fleece Jacket ($49.99), Sauce Labs Backpack ($29.99), Sauce Labs Bolt T-Shirt ($15.99), Test.allTheThings() T-Shirt ($15.99), Sauce Labs Bike Light ($9.99), Sauce Labs Onesie ($7.99)

**Expected Results:**
  - Products are sorted by price from highest to lowest
  - Sort dropdown shows 'Price (high to low)' as selected
  - Prices are in descending order: $49.99, $29.99, $15.99, $15.99, $9.99, $7.99

#### 2.5. Sort persistence after adding to cart

**File:** `tests/product-sorting/sort-persistence-after-cart-action.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Change sort to 'Price (low to high)'
  3. Add the first product (Sauce Labs Onesie) to cart
  4. Verify the sort order remains 'Price (low to high)'
  5. Verify products are still sorted by price

**Expected Results:**
  - Sort order is maintained after adding item to cart
  - Products remain in price low-to-high order
  - Sort dropdown still shows 'Price (low to high)' selected

### 3. Cart Management

**Seed:** `tests/seed.spec.ts`

#### 3.1. Add single item to cart

**File:** `tests/cart-management/add-single-item.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Verify cart badge shows no items (empty)
  3. Click 'Add to cart' button for Sauce Labs Backpack
  4. Verify cart badge shows '1'
  5. Verify the button text changes to 'Remove'
  6. Click the cart icon to view cart
  7. Verify Sauce Labs Backpack is in the cart with price $29.99

**Expected Results:**
  - Item is successfully added to cart
  - Cart badge updates to show '1'
  - Button changes from 'Add to cart' to 'Remove'
  - Cart page displays the added item with correct name, price, and quantity

#### 3.2. Add multiple items to cart

**File:** `tests/cart-management/add-multiple-items.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Click 'Add to cart' for Sauce Labs Backpack
  3. Click 'Add to cart' for Sauce Labs Bike Light
  4. Click 'Add to cart' for Sauce Labs Bolt T-Shirt
  5. Verify cart badge shows '3'
  6. Click the cart icon to view cart
  7. Verify all three items are displayed in the cart
  8. Verify each item shows correct name, price, and quantity of 1

**Expected Results:**
  - All three items are successfully added to cart
  - Cart badge shows '3'
  - Cart page displays all 3 items with correct details
  - Total quantity shown is 3 (1 of each item)

#### 3.3. Remove item from cart on products page

**File:** `tests/cart-management/remove-item-products-page.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Click 'Add to cart' for Sauce Labs Backpack
  3. Verify cart badge shows '1'
  4. Click the 'Remove' button for Sauce Labs Backpack
  5. Verify cart badge no longer shows a number (cart is empty)
  6. Verify button text changes back to 'Add to cart'
  7. Click cart icon and verify cart is empty

**Expected Results:**
  - Item is successfully removed from cart
  - Cart badge disappears or shows empty state
  - Button changes from 'Remove' to 'Add to cart'
  - Cart page shows no items

#### 3.4. Remove item from cart page

**File:** `tests/cart-management/remove-item-cart-page.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Add Sauce Labs Backpack and Sauce Labs Bike Light to cart
  3. Verify cart badge shows '2'
  4. Click cart icon to view cart
  5. Click 'Remove' button for Sauce Labs Backpack
  6. Verify only Sauce Labs Bike Light remains in cart
  7. Verify cart badge updates to '1'

**Expected Results:**
  - Item is removed from cart page
  - Remaining item is still displayed
  - Cart badge updates to show correct count
  - Cart page updates dynamically without page reload

#### 3.5. Add all items to cart

**File:** `tests/cart-management/add-all-items.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Click 'Add to cart' for all 6 products
  3. Verify cart badge shows '6'
  4. Verify all product buttons show 'Remove'
  5. Click cart icon to view cart
  6. Verify all 6 products are listed in the cart

**Expected Results:**
  - All 6 items are successfully added to cart
  - Cart badge shows '6'
  - All 'Add to cart' buttons changed to 'Remove'
  - Cart page displays all 6 products with correct details

#### 3.6. Continue shopping from cart

**File:** `tests/cart-management/continue-shopping.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Add Sauce Labs Backpack to cart
  3. Click cart icon to view cart
  4. Click 'Continue Shopping' button
  5. Verify redirect back to products page
  6. Verify cart badge still shows '1'
  7. Verify Sauce Labs Backpack still shows 'Remove' button

**Expected Results:**
  - User is redirected back to products page
  - Cart contents are preserved
  - Cart badge shows correct count
  - Previously added items still show 'Remove' state

#### 3.7. Cart persistence across navigation

**File:** `tests/cart-management/cart-persistence.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Add Sauce Labs Backpack to cart
  3. Verify cart badge shows '1'
  4. Click on Sauce Labs Bike Light product to view details
  5. Verify cart badge still shows '1'
  6. Click 'Back to products'
  7. Verify cart badge still shows '1'
  8. Verify Sauce Labs Backpack still shows 'Remove' button

**Expected Results:**
  - Cart contents persist across page navigation
  - Cart badge count remains consistent
  - Item states (Add/Remove) are maintained

#### 3.8. Empty cart checkout attempt

**File:** `tests/cart-management/empty-cart-checkout.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Click cart icon with empty cart
  3. Verify cart page shows no items
  4. Verify 'Checkout' button is present
  5. Click 'Checkout' button
  6. Verify behavior with empty cart

**Expected Results:**
  - Empty cart page is displayed correctly
  - User can proceed to checkout (or system prevents it with appropriate message)
  - Appropriate handling of empty cart scenario

### 4. Checkout Flow

**Seed:** `tests/seed.spec.ts`

#### 4.1. Complete checkout with single item

**File:** `tests/checkout-flow/complete-checkout-single-item.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Add Sauce Labs Backpack ($29.99) to cart
  3. Click cart icon and then 'Checkout' button
  4. Verify redirect to checkout step one page (checkout-step-one.html)
  5. Enter 'John' in First Name field
  6. Enter 'Doe' in Last Name field
  7. Enter '12345' in Zip/Postal Code field
  8. Click 'Continue' button
  9. Verify redirect to checkout step two page (checkout-step-two.html)
  10. Verify payment information displays: 'SauceCard #31337'
  11. Verify shipping information displays: 'Free Pony Express Delivery!'
  12. Verify item total shows $29.99
  13. Verify tax is calculated and displayed
  14. Verify total amount is correct (item + tax)
  15. Click 'Finish' button
  16. Verify redirect to checkout complete page (checkout-complete.html)
  17. Verify success message: 'Thank you for your order!'
  18. Verify order dispatched message is displayed

**Expected Results:**
  - Checkout process completes successfully through all three steps
  - All form data is accepted and validated
  - Order summary displays correct item, price, tax, and total
  - Success page displays with confirmation message
  - User can complete purchase successfully

#### 4.2. Complete checkout with multiple items

**File:** `tests/checkout-flow/complete-checkout-multiple-items.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Add Sauce Labs Backpack ($29.99), Sauce Labs Bike Light ($9.99), and Sauce Labs Bolt T-Shirt ($15.99) to cart
  3. Click cart icon and verify all 3 items are present
  4. Click 'Checkout' button
  5. Enter checkout information: First Name: 'Jane', Last Name: 'Smith', Zip: '67890'
  6. Click 'Continue'
  7. Verify all 3 items are listed on checkout overview page
  8. Verify item total is $55.97 ($29.99 + $9.99 + $15.99)
  9. Verify tax is calculated on total
  10. Verify final total is item total plus tax
  11. Click 'Finish'
  12. Verify order completion success message

**Expected Results:**
  - Multiple items checkout completes successfully
  - All items appear in checkout overview with correct prices
  - Subtotal calculates correctly as sum of all items
  - Tax is calculated on the subtotal
  - Final total is accurate
  - Order confirmation is displayed

#### 4.3. Checkout validation - empty first name

**File:** `tests/checkout-flow/validation-empty-first-name.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Add any item to cart and proceed to checkout
  3. Leave First Name field empty
  4. Enter 'Doe' in Last Name field
  5. Enter '12345' in Zip/Postal Code field
  6. Click 'Continue' button
  7. Verify error message is displayed for required first name

**Expected Results:**
  - Validation error message appears: 'Error: First Name is required'
  - User remains on checkout step one page
  - Form is not submitted
  - Other field values are preserved

#### 4.4. Checkout validation - empty last name

**File:** `tests/checkout-flow/validation-empty-last-name.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Add any item to cart and proceed to checkout
  3. Enter 'John' in First Name field
  4. Leave Last Name field empty
  5. Enter '12345' in Zip/Postal Code field
  6. Click 'Continue' button
  7. Verify error message is displayed for required last name

**Expected Results:**
  - Validation error message appears: 'Error: Last Name is required'
  - User remains on checkout step one page
  - Form is not submitted
  - Other field values are preserved

#### 4.5. Checkout validation - empty postal code

**File:** `tests/checkout-flow/validation-empty-postal-code.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Add any item to cart and proceed to checkout
  3. Enter 'John' in First Name field
  4. Enter 'Doe' in Last Name field
  5. Leave Zip/Postal Code field empty
  6. Click 'Continue' button
  7. Verify error message is displayed for required postal code

**Expected Results:**
  - Validation error message appears: 'Error: Postal Code is required'
  - User remains on checkout step one page
  - Form is not submitted
  - Other field values are preserved

#### 4.6. Cancel checkout from step one

**File:** `tests/checkout-flow/cancel-checkout-step-one.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Add Sauce Labs Backpack to cart
  3. Proceed to checkout step one
  4. Enter information in all fields
  5. Click 'Cancel' button
  6. Verify redirect back to cart page
  7. Verify items are still in cart

**Expected Results:**
  - User is redirected back to cart page
  - Cart contents are preserved
  - No data is lost
  - User can resume checkout

#### 4.7. Cancel checkout from step two

**File:** `tests/checkout-flow/cancel-checkout-step-two.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Add items to cart and complete checkout step one
  3. On checkout overview page (step two), click 'Cancel' button
  4. Verify redirect back to products page
  5. Verify cart still contains items

**Expected Results:**
  - User is redirected to products page
  - Cart contents are preserved
  - User can return to cart to complete checkout

#### 4.8. Return home after successful checkout

**File:** `tests/checkout-flow/return-home-after-checkout.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Complete full checkout process with any item
  3. On checkout complete page, verify 'Back Home' button is present
  4. Click 'Back Home' button
  5. Verify redirect to products page
  6. Verify cart is now empty (cart badge shows no items)

**Expected Results:**
  - User is redirected to products page
  - Cart is cleared after successful order
  - All items show 'Add to cart' buttons (not 'Remove')
  - User can start new shopping session

#### 4.9. Tax calculation accuracy

**File:** `tests/checkout-flow/tax-calculation-accuracy.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Add Sauce Labs Onesie ($7.99) to cart
  3. Complete checkout to step two (overview)
  4. Note the item total: $7.99
  5. Note the tax amount displayed
  6. Calculate expected tax (item total * tax rate)
  7. Verify tax amount matches expected calculation
  8. Verify total = item total + tax
  9. Repeat test with different priced items to verify consistent tax rate

**Expected Results:**
  - Tax is calculated correctly based on consistent rate
  - Tax amount is displayed with proper decimal precision
  - Total equals item total plus tax
  - Tax calculation is consistent across different cart totals

### 5. Product Details

**Seed:** `tests/seed.spec.ts`

#### 5.1. View product details from product image

**File:** `tests/product-details/view-details-from-image.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Click on the product image for Sauce Labs Backpack
  3. Verify redirect to product detail page (inventory-item.html?id=4)
  4. Verify product name is displayed: 'Sauce Labs Backpack'
  5. Verify product image is displayed
  6. Verify product description is displayed
  7. Verify product price is displayed: $29.99
  8. Verify 'Add to cart' button is present
  9. Verify 'Back to products' button is present

**Expected Results:**
  - Product detail page loads successfully
  - All product information is displayed correctly
  - Product name, image, description, and price match the products page
  - Navigation buttons are functional

#### 5.2. View product details from product name link

**File:** `tests/product-details/view-details-from-name.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Click on the product name link for 'Sauce Labs Bike Light'
  3. Verify redirect to product detail page
  4. Verify all product details are displayed correctly
  5. Verify price matches: $9.99

**Expected Results:**
  - Product detail page loads with correct information
  - Product name link navigates to detail page same as image click
  - All product information is accurate

#### 5.3. Add to cart from product details page

**File:** `tests/product-details/add-to-cart-from-details.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Click on Sauce Labs Bolt T-Shirt to view details
  3. Verify cart badge shows no items
  4. Click 'Add to cart' button on detail page
  5. Verify button changes to 'Remove'
  6. Verify cart badge updates to '1'
  7. Click 'Back to products'
  8. Verify on products page, the same item shows 'Remove' button

**Expected Results:**
  - Item is added to cart from detail page
  - Cart state synchronizes between detail and products pages
  - Cart badge updates correctly
  - Button state is consistent across pages

#### 5.4. Remove from cart on product details page

**File:** `tests/product-details/remove-from-cart-on-details.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Add Sauce Labs Fleece Jacket to cart from products page
  3. Click on the same product to view details
  4. Verify button shows 'Remove' on detail page
  5. Click 'Remove' button
  6. Verify button changes to 'Add to cart'
  7. Verify cart badge updates (decrements or disappears)
  8. Click 'Back to products'
  9. Verify item shows 'Add to cart' on products page

**Expected Results:**
  - Item is removed from cart via detail page
  - Button state synchronizes between pages
  - Cart badge updates correctly
  - Cart state is consistent across navigation

#### 5.5. Back to products navigation

**File:** `tests/product-details/back-to-products-navigation.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Sort products by 'Price (low to high)'
  3. Click on any product to view details
  4. Click 'Back to products' button
  5. Verify redirect back to products page
  6. Verify sort order is preserved (still 'Price (low to high)')
  7. Verify cart state is preserved if items were added

**Expected Results:**
  - User is returned to products page
  - Sort selection is maintained
  - Cart contents are preserved
  - Page state is restored as it was before viewing details

#### 5.6. View all product details sequentially

**File:** `tests/product-details/view-all-products-details.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. For each of the 6 products, perform the following:
  3. Click on product to view details
  4. Verify product detail page loads with correct information
  5. Verify product name, description, price are displayed
  6. Verify 'Add to cart' and 'Back to products' buttons are present
  7. Click 'Back to products' to return
  8. Repeat for next product

**Expected Results:**
  - All 6 product detail pages load successfully
  - Each page displays unique product information correctly
  - Navigation works consistently for all products
  - No errors or broken pages encountered

### 6. Navigation and Menu

**Seed:** `tests/seed.spec.ts`

#### 6.1. Open and close navigation menu

**File:** `tests/navigation-menu/open-close-menu.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Click the menu button (hamburger icon)
  3. Verify menu sidebar opens and displays navigation options
  4. Verify menu contains: 'All Items', 'About', 'Logout', 'Reset App State'
  5. Click the 'X' close button
  6. Verify menu closes and sidebar disappears

**Expected Results:**
  - Menu opens smoothly when button is clicked
  - All four menu options are visible
  - Menu closes when close button is clicked
  - Page content is accessible after menu closes

#### 6.2. Navigate to All Items from menu

**File:** `tests/navigation-menu/navigate-all-items.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Navigate to cart page
  3. Open the menu
  4. Click 'All Items' link
  5. Verify redirect to products/inventory page
  6. Verify all products are displayed

**Expected Results:**
  - Clicking 'All Items' navigates to products page
  - Products page loads successfully
  - Menu closes after navigation

#### 6.3. Navigate to About page

**File:** `tests/navigation-menu/navigate-about.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Open the menu
  3. Click 'About' link
  4. Verify redirect to external Sauce Labs website (https://saucelabs.com/)
  5. Verify new page opens or current page navigates to Sauce Labs site

**Expected Results:**
  - About link redirects to Sauce Labs external website
  - Link functions correctly (may open in new tab or same window)
  - External site loads successfully

#### 6.4. Reset app state functionality

**File:** `tests/navigation-menu/reset-app-state.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Add multiple items to cart (e.g., 3 items)
  3. Verify cart badge shows '3'
  4. Open the menu
  5. Click 'Reset App State'
  6. Close the menu
  7. Verify cart badge no longer shows items (cart is reset)
  8. Verify all products show 'Add to cart' buttons
  9. Click cart icon and verify cart is empty

**Expected Results:**
  - Reset App State clears the cart
  - Cart badge is removed or shows empty
  - All product buttons reset to 'Add to cart'
  - Cart page shows no items
  - App returns to initial state without logging out

#### 6.5. Menu accessibility from different pages

**File:** `tests/navigation-menu/menu-accessibility.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Verify menu button is present on products page
  3. Navigate to product detail page and verify menu button is present
  4. Navigate to cart page and verify menu button is present
  5. Navigate to checkout step one and verify menu button is present
  6. Navigate to checkout step two and verify menu button is present
  7. Verify menu can be opened from each page

**Expected Results:**
  - Menu button is accessible on all main pages
  - Menu opens consistently from all pages
  - Menu options are available throughout the application
  - Navigation is consistent across the application

#### 6.6. Cart icon visibility and accessibility

**File:** `tests/navigation-menu/cart-icon-accessibility.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Verify cart icon is visible in header on products page
  3. Navigate to product detail page and verify cart icon is visible
  4. Add item to cart and verify cart badge appears
  5. Navigate to different pages and verify cart icon and badge persist
  6. Click cart icon from products page and verify navigation to cart
  7. Return to products and verify cart icon still shows badge

**Expected Results:**
  - Cart icon is visible on all main application pages
  - Cart icon is clickable and navigates to cart page
  - Cart badge displays accurate count across all pages
  - Cart icon provides consistent access to cart throughout app

### 7. Cross-Feature Integration

**Seed:** `tests/seed.spec.ts`

#### 7.1. Sort, add to cart, and checkout flow

**File:** `tests/integration/sort-add-checkout.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Sort products by 'Price (low to high)'
  3. Add the 3 cheapest items to cart (Onesie $7.99, Bike Light $9.99, T-Shirt $15.99)
  4. Verify cart badge shows '3'
  5. Navigate to cart and verify all 3 items are present
  6. Proceed through complete checkout flow
  7. Verify order total is correct: $33.97 + tax
  8. Complete order and verify success

**Expected Results:**
  - Sorting and cart management work together seamlessly
  - Items maintain their details through checkout
  - Prices and totals calculate correctly
  - Full flow completes without errors

#### 7.2. Add from products page, modify on detail page, checkout

**File:** `tests/integration/products-details-cart-checkout.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Add Sauce Labs Backpack from products page
  3. Click on Sauce Labs Bike Light to view details
  4. Add to cart from detail page
  5. Add Sauce Labs Onesie from products page
  6. Verify cart badge shows '3'
  7. Navigate to cart and verify all 3 items
  8. Remove Bike Light from cart
  9. Complete checkout with remaining 2 items
  10. Verify order total: $37.98 + tax

**Expected Results:**
  - Items can be added from multiple pages
  - Cart modifications work correctly
  - Checkout reflects current cart state accurately
  - Full flow integrates all features smoothly

#### 7.3. Multiple checkout cycles in single session

**File:** `tests/integration/multiple-checkout-cycles.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Add Sauce Labs Backpack to cart and complete checkout
  3. Verify order success and click 'Back Home'
  4. Verify cart is empty
  5. Add Sauce Labs Bike Light to cart
  6. Complete second checkout
  7. Verify order success
  8. Verify ability to continue shopping for third order

**Expected Results:**
  - Multiple checkout cycles work in single session
  - Cart clears after each successful order
  - User can complete multiple purchases without issues
  - Session maintains authentication throughout

#### 7.4. Add all items, remove some, sort, and checkout

**File:** `tests/integration/complex-cart-manipulation.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Add all 6 items to cart
  3. Verify cart badge shows '6'
  4. Sort products by 'Name (Z to A)'
  5. Remove 2 items from products page
  6. Navigate to cart and verify 4 items remain
  7. Remove 1 more item from cart page
  8. Verify cart badge shows '3'
  9. Complete checkout with remaining 3 items
  10. Verify successful order completion

**Expected Results:**
  - Complex cart manipulations work correctly
  - Cart state remains consistent across operations
  - Sorting doesn't affect cart contents
  - Checkout works with dynamically modified cart

### 8. Error Handling and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 8.1. Problem user - image loading issues

**File:** `tests/edge-cases/problem-user-images.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
  2. Login with 'problem_user' and ''
  3. Verify login is successful
  4. Observe product images on products page
  5. Verify if images load correctly or if there are issues
  6. Add item to cart and proceed through checkout
  7. Document any anomalies in the user experience

**Expected Results:**
  - Problem user reveals UI/image issues
  - Issues are documented for testing purposes
  - User can still complete basic flows despite issues

#### 8.2. Performance glitch user - slow response

**File:** `tests/edge-cases/performance-glitch-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
  2. Login with 'performance_glitch_user' and ''
  3. Measure time for login to complete
  4. Verify if page loads are delayed
  5. Add items to cart and observe response times
  6. Complete checkout and note any delays
  7. Document performance issues encountered

**Expected Results:**
  - Performance delays are observable and measurable
  - User can still complete flows but with delays
  - Performance issues are consistent and reproducible

#### 8.3. Error user - error scenarios

**File:** `tests/edge-cases/error-user-scenarios.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
  2. Login with 'error_user' and ''
  3. Attempt to add items to cart
  4. Observe any error behaviors
  5. Attempt to sort products
  6. Attempt checkout flow
  7. Document all errors encountered

**Expected Results:**
  - Error user triggers specific error scenarios
  - Errors are handled gracefully by the application
  - Error messages are displayed appropriately

#### 8.4. Visual user - visual regression testing

**File:** `tests/edge-cases/visual-user-differences.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
  2. Login with 'visual_user' and ''
  3. Compare visual appearance with standard_user
  4. Check for layout differences, styling issues, or visual bugs
  5. Navigate through all major pages
  6. Document visual discrepancies

**Expected Results:**
  - Visual differences are identified and documented
  - Visual regression testing reveals UI inconsistencies
  - Application functionality remains intact despite visual issues

#### 8.5. Direct URL access without authentication

**File:** `tests/edge-cases/direct-url-access.spec.ts`

**Steps:**
  1. Navigate directly to https://www.saucedemo.com/inventory.html without logging in
  2. Verify redirect to login page or access denied
  3. Navigate directly to https://www.saucedemo.com/cart.html
  4. Verify authentication is required
  5. Navigate directly to https://www.saucedemo.com/checkout-step-one.html
  6. Verify authentication protection

**Expected Results:**
  - Protected pages require authentication
  - Unauthenticated users are redirected to login
  - Application enforces authentication on all protected routes
  - No data is accessible without proper authentication

#### 8.6. Browser back button during checkout

**File:** `tests/edge-cases/browser-back-button-checkout.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Add item to cart and proceed to checkout step one
  3. Enter information and click Continue to reach step two
  4. Use browser back button to return to step one
  5. Verify form data is preserved or cleared appropriately
  6. Proceed forward again through checkout
  7. Use back button from checkout complete page
  8. Verify appropriate handling

**Expected Results:**
  - Browser back button is handled gracefully
  - Form data handling is appropriate
  - No errors occur when using browser navigation
  - Checkout flow remains consistent

#### 8.7. Special characters in checkout form

**File:** `tests/edge-cases/special-characters-checkout-form.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Add item to cart and proceed to checkout
  3. Enter special characters in First Name: '@#$%^&*()'
  4. Enter special characters in Last Name: '<script>alert()</script>'
  5. Enter letters in Zip Code: 'ABCDE'
  6. Click Continue and observe validation behavior
  7. Test with various edge case inputs

**Expected Results:**
  - Form validation handles special characters appropriately
  - XSS attempts are prevented
  - Invalid data types are rejected with appropriate messages
  - Form sanitization works correctly

#### 8.8. Very long strings in checkout form

**File:** `tests/edge-cases/long-strings-checkout-form.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with standard_user
  2. Add item to cart and proceed to checkout
  3. Enter a very long string (200+ characters) in First Name
  4. Enter a very long string in Last Name
  5. Enter a very long string in Zip Code
  6. Attempt to continue
  7. Verify field length limits and validation

**Expected Results:**
  - Form fields have appropriate length limits
  - Overflow is handled gracefully
  - UI remains functional with long inputs
  - Validation messages are clear
