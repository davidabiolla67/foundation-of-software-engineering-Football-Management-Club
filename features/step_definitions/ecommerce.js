
  // Declare driver globally

// Hook: Runs before each scenario


const { Before, After, Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, until } = require('selenium-webdriver');
const os = require('os');
const path = require('path');
const assert = require('assert');
require('chromedriver');
let driver;
Before({ timeout: 15000}, async function () {
  const chromeCapabilities = Capabilities.chrome();

  // Create a unique temporary directory for Chrome's user data
  const uniqueUserDataDir = path.join(
    os.tmpdir(),
    'chrome-profile-' + Date.now() + '-' + Math.floor(Math.random() * 10000)
  );

  chromeCapabilities.set('goog:chromeOptions', {
    args: [
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--headless', 
      `--user-data-dir=${uniqueUserDataDir}` // Use a unique directory for this session
    ]
  });

  driver = new Builder().withCapabilities(chromeCapabilities).build();
});





// Hook: Runs after each scenario
After(async function () {
    if (driver) {

        await driver.quit();
    }
});

// Steps for successful login
Given('the user is on the "Store" page with available products', { timeout: 15000}, async function () {
    await driver.get('http://localhost:3000/store');
});

When('the user clicks on "Add to Cart" for a product', { timeout: 15000}, async function () {
    await driver.findElement(By.id("add_to_cart_btn")).click();
});

When('the user clicks on "Proceed to Checkout"', { timeout: 15000}, async function () {
     await driver.findElement(By.id("ptoc_btn")).click(); // Wait for AppBar to appear on home page
});

// Steps for unsuccessful login
When('the user fills "shipping details"',{ timeout: 15000}, async function () {
  await driver.findElement(By.name("name")).sendKeys("Jane Doe");
     await driver.findElement(By.name("address")).sendKeys("2000 Simcoe Street, West Oshawa, Onatrio, Canada ");
      await driver.findElement(By.name("payment")).sendKeys("Pay on delivery");
      
});

When(' the user clicks on confirm order', { timeout: 15000 }, async function () {
    // Pause to allow the toast notification to appear
    await driver.findElement(By.id("confirmdtbtn")).click();
});



Then('the user navigated to order history page', { timeout: 20000 }, async function () {
  // Pause to allow the toast notification to appear
  let actualUrl = browser.getUrl();
  let expectedUrl = 'http://localhost:3000/order-history'
  assert.equal(actualUrl, expectedUrl, `Expected URL to be ${expectedUrl} but got ${actualUrl}`)
});



