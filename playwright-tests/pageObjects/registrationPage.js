// /playwright-tests/pageObjects/RegistrationPage.js

// Properties and functions for Registration page
class RegistrationPage {
    constructor(page) {
        this.page = page;

        // Locators for the main interactive elements on the Registration page
        this.emailInput = page.locator('input[name="email"]');
        this.userNameInput = page.locator('input[name="userName"]');
        this.passwordInput = page.locator('input[name="password"]');

        this.continueButton = page.locator('fx-button:has-text("Continue"):visible');

        this.genderMaleRb = page.locator('input[id="gender-m"]');
        this.genderFemaleRb = page.locator('input[id="gender-f"]');

        this.firstNameInput = page.locator('input[name="firstName"]');
        this.lastNameInput = page.locator('input[name="lastName"]');
        this.dateInput = page.locator('input[name="dateOfBirth"]');

        this.postalCodeInput = page.locator('input[name="postalCode"]');
        this.cityInput = page.locator('input[name="city"]');
        this.stateDropdown = page.locator('fx-form-select[formcontrolname="stateId"]');
        this.addressInput = page.locator('input[name="address1"]');
        this.phoneInput = page.locator('input[name="mobilePhone"]');
        this.termsInput = page.locator('input[id="terms"]');

        this.registerButton = page.locator('button:has-text("Register"):visible');

        this.accountCreatedDiv = page.locator('.banner-message');

        this.playNowLink = page.locator('a:has-text("Play now")');
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async checkGenderMaleRb() {
        await this.genderMaleRb.click();
    }

    async checkGenderFemaleRb() {
        await this.genderFemaleRb.click();
    }

    async selectStateDropdownItem(stateName) {
        await this.stateDropdown.locator('div.form-control-input').click();
        await this.stateDropdown.locator(`fx-form-option:has-text("${stateName}")`).click();
    }

    async acceptTerms() {
        await this.termsInput.click();
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }
}

module.exports = { RegistrationPage };
