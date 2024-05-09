// /playwright-tests/pageObjects/HomePage.js

// Properties and functions for Home page
class HomePage {
    constructor(page, baseUrl) {
        this.page = page;
        this.baseUrl = baseUrl;

        // Locators for the main interactive elements on the Home page
        this.loginLink = page.locator('a:has-text("Login"):visible');
        this.registrationLink = page.locator('a:has-text("Register"):visible');
        this.profileNameElement = page.locator('.profile-snippet__name');
        this.profileBalanceElement = page.locator('.profile-snippet__balance');
        this.profileButton = page.locator('.dropdown-toggle');

        // Locators for links within the profile dropdown menu
        this.cashierLink = page.locator('fx-dropdown-menu .dropdown-item:has-text("Cashier")');
        this.accountLink = page.locator('fx-dropdown-menu .dropdown-item:has-text("Account")');
        this.bonusLink = page.locator('fx-dropdown-menu .dropdown-item:has-text("Bonus")');
        this.logOutLink = page.locator('fx-dropdown-menu .dropdown-item:has-text("Log Out")');

        this.returnToDecodeLink = page.locator('a:has-text("Return to DECODE Lobby")');
    }

    async navigate() {
        await this.page.goto(this.baseUrl);
    }

    async clickLoginLink() {
        await this.loginLink.click();
    }

    async clickRegistrationLink() {
        await this.registrationLink.click();
    }

    async clickProfileButton() {
        await this.profileButton.click();
    }

    async clickCashierLink() {
        await this.cashierLink.click();
    }

    async clickAccountLink() {
        await this.accountLink.click();
    }

    async clickBonusLink() {
        await this.bonusLink.click();
    }

    async clickLogOutLink() {
        await this.logOutLink.click();
    }

    async clickReturnToDecodeLink() {
        await this.returnToDecodeLink.click();
    }
}

module.exports = { HomePage };

