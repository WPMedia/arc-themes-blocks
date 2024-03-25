// @ts-check
const { test, expect } = require('@playwright/test');

test('signUp', async ({ page }) => {
  await page.goto('https://themesinternal-the-gazette-dev.web.arc-cdn.net/All-blocks-qa/');
  await page.goto('https://themesinternal-the-gazette-dev.web.arc-cdn.net/account/signup/');
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('qa1.test@gmail.com');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Qatest@123456');
  await page.getByLabel('Confirm password').click();
  await page.getByLabel('Confirm password').fill('Qatest@123456');
  await page.getByRole('button', { name: 'Sign Up' }).click();
});

test('log in', async ({ page }) => {
  await page.goto('https://themesinternal-the-gazette-dev.web.arc-cdn.net/All-blocks-qa/');
  await page.goto('https://themesinternal-the-gazette-dev.web.arc-cdn.net/account/login/');
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('qa1.test@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Qatest@123456');
  await page.getByRole('button', { name: 'Log In' }).click();
});

test('section search bar', async ({ page }) => {
  await page.goto('https://themesinternal-the-gazette-dev.web.arc-cdn.net/All-blocks-qa/');
  await page.getByTestId('nav-chain-nav-components-desktop-left').getByTestId('nav-chain-nav-section-button').click();
  await page.getByTestId('nav-chain-nav-components-desktop').getByPlaceholder('Search').click();
  await page.getByTestId('nav-chain-nav-components-desktop').getByPlaceholder('Search').fill('sport');
  await page.getByTestId('nav-chain-nav-components-desktop').getByPlaceholder('Search').press('Enter');
  await page.goto('https://themesinternal-the-gazette-dev.web.arc-cdn.net/All-blocks-qa/');
});

test('section drop down', async ({ page }) => {
  await page.goto('https://themesinternal-the-gazette-dev.web.arc-cdn.net/All-blocks-qa/');
  await page.getByTestId('nav-chain-nav-components-desktop-left').getByTestId('nav-chain-nav-section-button').click();
  await page.locator('#flyout-overlay').getByRole('link', { name: 'News' }).click();
  await page.goto('https://themesinternal-the-gazette-dev.web.arc-cdn.net/All-blocks-qa/');
});