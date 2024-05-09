// tests/e2e/userFlow.test.js
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pageObjects/HomePage');
const { RegistrationPage } = require('../../pageObjects/RegistrationPage');
const { LoginHelper } = require('../../utils/loginHelper');
const { SignInPage } = require('../../pageObjects/SignInPage');
const { registrationData } = require('../../fixtures/registrationData');
const { applicationMessages } = require('../../fixtures/applicationMessages');
const { testAccountData } = require('../../fixtures/testAccountData');
const { pageTitles } = require('../../fixtures/pageTitles');
const config = require('../../config');

test('All user account pages are shown after new user is created', async ({ page }) => {
    const homePage = new HomePage(page, config.baseUrl);
    const signInPage = new SignInPage(page);
    const registrationPage = new RegistrationPage(page);
    const helper = new LoginHelper(page)

    await homePage.navigate();
    await homePage.clickRegistrationLink();

    // First registration stage
    await registrationPage.emailInput.fill(registrationData.email);
    await registrationPage.userNameInput.fill(registrationData.username);
    await registrationPage.passwordInput.type(registrationData.password);

    // Click on Continue
    await registrationPage.clickContinueButton();

    // Second registration stage
    await registrationPage.checkGenderMaleRb();
    await registrationPage.firstNameInput.fill(registrationData.firstName);
    await registrationPage.lastNameInput.fill(registrationData.lastName);
    await registrationPage.dateInput.fill(registrationData.dateOfBirth);

    // Click on Continue
    await registrationPage.clickContinueButton();

    // Third registration stage
    await registrationPage.postalCodeInput.type(registrationData.postalCode);
    await registrationPage.cityInput.type(registrationData.city);
    await registrationPage.addressInput.type(registrationData.address);
    await registrationPage.phoneInput.type(registrationData.phone);

    // Agree to terms and conditions
    await registrationPage.acceptTerms();

    // Ensure the Register button is enabled before clicking
    let isRegisterDisabled = await registrationPage.registerButton.isDisabled();
    while (isRegisterDisabled) {
        await registrationPage.selectStateDropdownItem(registrationData.state);
        isRegisterDisabled = await registrationPage.registerButton.isDisabled();
    }

    // Complete the registration
    await registrationPage.clickRegisterButton();

    // Wait for network activity to settle before proceeding
    await page.waitForLoadState('networkidle');

    // Be sure Play Now button is visible (need to be visible before success text is shown)
    await registrationPage.playNowLink.waitFor({ state: 'visible' });

    // Confirm that registration was successful
    await expect(registrationPage.accountCreatedDiv).toHaveText(applicationMessages.accountCreatedText);

    // Check Cashier user menu
    await homePage.clickProfileButton();
    await homePage.clickCashierLink();
    await expect(page).toHaveTitle(pageTitles.cashier);
    await homePage.navigate();
    await expect(page).toHaveTitle(pageTitles.home);

    // Check Account user menu
    await homePage.clickProfileButton();
    await homePage.clickAccountLink();
    await expect(page).toHaveTitle(pageTitles.account);
    await homePage.navigate();
    await expect(page).toHaveTitle(pageTitles.home);

    // Check Bonus user menu
    await homePage.clickProfileButton();
    await homePage.clickBonusLink();
    await expect(page).toHaveTitle(pageTitles.bonus);
    await homePage.navigate();
    await expect(page).toHaveTitle(pageTitles.home);

    // Log out and check Home page is shown
    await homePage.clickProfileButton();
    await homePage.clickLogOutLink();
    await homePage.clickReturnToDecodeLink();
    await expect(page).toHaveTitle(pageTitles.home);

    // Log in
    await homePage.clickLoginLink();
    await signInPage.usernameInput.fill(registrationData.username);
    await signInPage.passwordInput.fill(registrationData.password);
    await signInPage.clickLoginButton();

    // Check username and initial balance are shown
    await expect(homePage.profileNameElement).toHaveText(registrationData.username);
    await expect(homePage.profileBalanceElement).toHaveText(registrationData.initialBalance);
});
