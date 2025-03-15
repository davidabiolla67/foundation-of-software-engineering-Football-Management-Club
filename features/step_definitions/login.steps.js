
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
Given('I open the login page', { timeout: 15000}, async function () {
    await driver.get('http://localhost:3000/login');
});

When('I input valid credentials', { timeout: 15000}, async function () {
    await driver.findElement(By.name("email")).sendKeys("rayo@gmail.com");
    await driver.findElement(By.name("password")).sendKeys("password123");
    await driver.findElement(By.id("login_btn")).click();
});

Then('I should be navigated to home page', { timeout: 15000}, async function () {
    await driver.wait(until.elementLocated(By.css('.AppBar')), 10000); // Wait for AppBar to appear on home page
});

// Steps for unsuccessful login
When('I input invalid credentials',{ timeout: 15000}, async function () {
    await driver.findElement(By.name("email")).sendKeys("wronguser@gmail.com");
    await driver.findElement(By.name("password")).sendKeys("wrongpassword");
    await driver.findElement(By.id("login_btn")).click();
});

Then('I should see an error message', { timeout: 15000 }, async function () {
    // Pause to allow the toast notification to appear
    await driver.sleep(5000);
    
    // Increase wait time for locating the toast element
    let errorMessage = await driver.wait(
      until.elementLocated(By.className("Toastify__toast")),
      10000
    );
    
    let text = await errorMessage.getText();
    let cleanedText = text.trim();
    
    // Debugging logs
    console.log('Raw text:', JSON.stringify(text));
    console.log('Cleaned text:', JSON.stringify(cleanedText));
    console.log('Char codes:', cleanedText.split('').map(c => c.charCodeAt(0)));
    console.log('Error text:', JSON.stringify(text));
    console.log(text);
    
    // Assert the error text
    assert.strictEqual(cleanedText, "invalid-credential.");
});


