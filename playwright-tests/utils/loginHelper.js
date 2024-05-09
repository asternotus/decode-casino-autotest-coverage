// utils/loginHelper.js

// Helper functions for login process
const { HomePage } = require('../pageObjects/HomePage');
const { SignInPage } = require('../pageObjects/SignInPage');
const { testAccountData } = require('../fixtures/testAccountData');
const config = require('../config');

class LoginHelper {
    constructor(page) {
        this.page = page;
        this.homePage = new HomePage(page, config.baseUrl);
        this.signInPage = new SignInPage(page);
    }

    async loginToAccount() {
        await this.homePage.navigate();
        await this.homePage.clickLoginLink();
        await this.signInPage.usernameInput.fill(testAccountData.username);
        await this.signInPage.passwordInput.fill(testAccountData.password);
        await this.signInPage.clickLoginButton();
    }
}

module.exports = { LoginHelper };
