
const { test, expect } = require('@playwright/test');

test('standard user can complete a purchase', async ({ page }) => {
  // 1. Log in
  await page.goto('/');

  await page.locator('[data-test="username"]')
    .fill('standard_user');

  await page.locator('[data-test="password"]')
    .fill('secret_sauce');

  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(
    page.locator('.inventory_item')
  ).toHaveCount(6);

  // 2. Add one specific product to the cart
  const product = page.locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' });

  await product.locator('button').click();

  await expect(
    product.locator('button')
  ).toHaveText('Remove');

  await expect(
    page.locator('[data-test="shopping-cart-badge"]')
  ).toHaveText('1');

  // 3. Verify the cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true })
  ).toBeVisible();

  await expect(
    page.locator('[data-test="cart-list"] .cart_item')
  ).toHaveCount(1);

  await page.locator('[data-test="checkout"]').click();

  // 4. Complete checkout information
  await page.locator('[data-test="firstName"]').fill('QA');
  await page.locator('[data-test="lastName"]').fill('Tester');
  await page.locator('[data-test="postalCode"]').fill('12345');

  await page.locator('[data-test="continue"]').click();

  // 5. Verify the order overview before submitting
  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true })
  ).toBeVisible();

  await expect(
    page.locator('[data-test="cart-list"] .cart_item')
  ).toHaveCount(1);

  await expect(
    page.locator('[data-test="total-label"]')
  ).toBeVisible();

  // 6. Finish the order and verify confirmation
  await page.locator('[data-test="finish"]').click();

  await expect(
    page.locator('[data-test="complete-header"]')
  ).toHaveText('Thank you for your order!');

  await expect(
    page.locator('[data-test="complete-text"]')
  ).toContainText('Your order has been dispatched');
});
