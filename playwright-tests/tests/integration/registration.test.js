// tests/registration.test.js

// This suite verifying the entire registration process for a new user account
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pageObjects/HomePage');
const { RegistrationPage } = require('../../pageObjects/RegistrationPage');
const { registrationData } = require('../../fixtures/registrationData');
const { applicationMessages } = require('../../fixtures/applicationMessages');
const config = require('../../config');

test('New account is created after all registration stages are finished and Register button is clicked', async ({ page }) => {
    const homePage = new HomePage(page, config.baseUrl);
    const registrationPage = new RegistrationPage(page);

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
});
