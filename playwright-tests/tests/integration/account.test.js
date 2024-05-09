// tests/account.test.js

// This suite performs user interaction tests for various account-related pages
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pageObjects/HomePage');
const { LoginHelper } = require('../../utils/loginHelper');
const { testAccountData } = require('../../fixtures/testAccountData');
const { pageTitles } = require('../../fixtures/pageTitles');
const config = require('../../config');

test.describe('User interaction tests', () => {
    let homePage;
    let helper; 

    // Setup before each test: login and navigate to the user profile dropdown
    test.beforeEach(async ({ page }) => {
        
        // Perform login and click on user profile dropdown
        homePage = new HomePage(page, config.baseUrl);
        helper = new LoginHelper(page);
        await helper.loginToAccount(page);
        await homePage.clickProfileButton();
    });

    test('Cashier page is opened after clicking the Cashier link', async ({ page }) => {
        await homePage.clickCashierLink();
        await expect(page).toHaveTitle(pageTitles.cashier);
    });

    test('Account page is opened after clicking the Account link', async ({ page }) => {
        await homePage.clickAccountLink();
        await expect(page).toHaveTitle(pageTitles.account);

        // Verify that user details are correctly displayed on the Account page
        await expect(page.locator(`text="${testAccountData.username}"`)).toHaveText(testAccountData.username);
        await expect(page.locator(`text="${testAccountData.email}"`)).toHaveText(testAccountData.email);
        await expect(page.locator(`text="${testAccountData.phone}"`)).toHaveText(testAccountData.phone);
        await expect(page.locator(`text="${testAccountData.city}"`)).toHaveText(testAccountData.city);
        await expect(page.locator(`text="${testAccountData.address}"`)).toHaveText(testAccountData.address);
        await expect(page.locator(`text="${testAccountData.dateOfBirth}"`)).toHaveText(testAccountData.dateOfBirth);
    });

    test('Bonus page is opened after clicking the Bonus link', async ({ page }) => {
        await homePage.clickBonusLink();
        await expect(page).toHaveTitle(pageTitles.bonus);
    });

    test('User is logged out successfully', async ({ page }) => {
        await homePage.clickLogOutLink();
        await homePage.clickReturnToDecodeLink();
        await expect(page).toHaveTitle(pageTitles.home);
    });
});
