const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, until } = require('selenium-webdriver');
const assert = require('assert');
require('chromedriver');

let driver;  // Declare driver globally

// Hook: Runs before each scenario
Before(async function () {
    const chromeCapabilities = Capabilities.chrome();
    chromeCapabilities.set('goog:chromeOptions', { 
        args: ['--disable-gpu', '--headless', '--no-sandbox', '--user-data-dir=/path/to/a/unique/directory'] 
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
Given('I open the login page', async function () {
    await driver.get('http://localhost:3000/login');
});

When('I input valid credentials', async function () {
    await driver.findElement(By.name("email")).sendKeys("rayo@gmail.com");
    await driver.findElement(By.name("password")).sendKeys("password123");
    await driver.findElement(By.id("login_btn")).click();
});

Then('I should be navigated to home page', async function () {
    await driver.wait(until.elementLocated(By.css('.AppBar')), 10000); // Wait for AppBar to appear on home page
});

// Steps for unsuccessful login
When('I input invalid credentials', async function () {
    await driver.findElement(By.name("email")).sendKeys("wronguser@gmail.com");
    await driver.findElement(By.name("password")).sendKeys("wrongpassword");
    await driver.findElement(By.id("login_btn")).click();
});

Then('I should see an error message', async function () {
    // Wait for the error message to appear
    let errorMessage = await driver.wait(until.elementLocated(By.className("Toastify__toast")), 5000);
    let text = await errorMessage.getText();
    assert.strictEqual(text, "invalid-credential.");  // Check if the message matches
    console.log(text);  // Log the error message to the console
});
