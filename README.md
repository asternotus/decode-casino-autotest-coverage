# Decode Casino Automation Tests

## Overview
This repository contains automated tests for validating the functionality of registration, login, and user profile management at the Decode Casino platform.

## Getting Started
Follow these steps to run the tests on your local machine:

## Cloning the Repository
Open your terminal and execute the following command to clone the repository:
```bash
git clone https://github.com/asternotus/decode-casino-autotest-coverage.git
cd decode-casino-autotest-coverage

## Installing Dependencies
Ensure you have **Node.js** installed on your system. Then install the required dependencies with:

```bash
npm install

## Running Tests
To run all tests, use the following command:
```bash
npx playwright test

To run tests specifically from the integration directory:
```bash
npx playwright test tests/integration

## Important Notes
- Tests in the integration folder utilize data from the fixtures/testAccountData.js file. Since the site may delete unverified accounts via email, you may need to register a new user and update these test credentials in testAccountData.js for the tests to function correctly.
- Ensure that all file paths and settings in playwright.config.js are correctly configured for your system and environment.