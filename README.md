# SauceDemo Playwright E2E Automation

## Overview
A beginner-friendly end-to-end UI automation project using Playwright with JavaScript to test a purchase workflow on SauceDemo.

## Automated Test
The current test verifies that a standard user can:
- Log in successfully.
- View the inventory and confirm six products are displayed.
- Add the Sauce Labs Backpack to the cart.
- Verify the cart badge and selected product.
- Enter checkout information.
- Review the order overview.
- Complete the purchase and verify the confirmation message.

## Technology Stack
- JavaScript
- Playwright Test
- Node.js
- Chromium
- Visual Studio Code

## Prerequisites
Install Node.js and Git.

## Run the Tests
Install project dependencies:

```bash
npm install
npx playwright install chromium
```

Run the test in headless mode:

```bash
npm test
```

Run the test with the browser visible:

```bash
npm run test:headed
```

## Current Status
The checkout end-to-end test has passed successfully.