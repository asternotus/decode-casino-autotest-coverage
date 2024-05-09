// /playwright-tests/pageObjects/SignInPage.js

// Properties and functions for Sign In page
class SignInPage {
    constructor(page) {
        this.page = page;

        // Locators for the main interactive elements on the Sign In page
        this.usernameInput = page.locator('input[id="Username"]');
        this.passwordInput = page.locator('input[id="Password"]');
        this.loginButton = page.locator('button:has-text("Login"):visible');
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }
}

module.exports = { SignInPage };
