// tests/login.test.js

// This suite for verifying the login functionality with valid credentials on the Homepage
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pageObjects/HomePage');
const { LoginHelper } = require('../../utils/loginHelper');
const { testAccountData } = require('../../fixtures/testAccountData');
const config = require('../../config');


test('Sign in with valid credentials and login is successful', async ({ page }) => {
    const homePage = new HomePage(page, config.baseUrl);
    const helper = new LoginHelper(page);

    // Perform login
    await helper.loginToAccount(page);

    // Verify that the username and initial balance are displayed
    await expect(homePage.profileNameElement).toHaveText(testAccountData.username);
    await expect(homePage.profileBalanceElement).toHaveText(testAccountData.initialBalance);
});
