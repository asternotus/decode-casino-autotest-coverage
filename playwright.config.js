const {devices} = require('@playwright/test');

module.exports = {
    projects: [
      {
        name: 'Chromium',
        use: {
          ...devices['Desktop Chrome'],
          headless: false
        },
      },
    ],
  };