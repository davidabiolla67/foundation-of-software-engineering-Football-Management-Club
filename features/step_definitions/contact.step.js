
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
      '--headless', // Headless mode for CI
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
Given('I open the contact page', { timeout: 15000}, async function () {
    await driver.get('http://localhost:3000/contact');
});

When('I fill in valid contact information', { timeout: 15000}, async function () {
    await driver.findElement(By.name("name")).sendKeys("John Doe");
    await driver.findElement(By.name("email")).sendKeys("johndoe@gmail.com");
    await driver.findElement(By.name("subject")).sendKeys("this is subject of the form");
    await driver.findElement(By.name("message")).sendKeys("this is message of the form");
    await driver.findElement(By.id("send_btn")).click();
});




Then('I should have my form submitted', { timeout: 15000 }, async function () {
    // Pause to allow the toast notification to appear
    await driver.sleep(5000);
    
    // Increase wait time for locating the toast element
    let successMessage =   await driver.findElement(By.id("success"))
    
    
    // Debugging logs
    console.log(successMessage)
  
    
    // Assert the error text
    assert.strictEqual(successMessage, "Message sent successfully!");
});


