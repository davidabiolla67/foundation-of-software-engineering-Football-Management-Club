
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
      // Headless mode for CI
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
Given('I open the sign up page', { timeout: 15000}, async function () {
    await driver.get('http://localhost:3000/signup');
});

When('I input valid sign up credentials', { timeout: 15000}, async function () {
  await driver.findElement(By.name("First_Name")).sendKeys("rayodoy");
    await driver.findElement(By.name("Last_Name")).sendKeys("badoenman");
    await driver.findElement(By.name("Email_")).sendKeys("rayoduh6700@gmail.com");
    await driver.findElement(By.name("Password_")).sendKeys("password123");
    await driver.findElement(By.id("signup_btn")).click();
});

Then('I should see user logged in successfully', { timeout: 15000}, async function () {

  await driver.sleep(5000);
  let successMessage = await driver.wait(
    until.elementLocated(By.className("Toastify__toast")),
    10000
  );
    let text = await successMessage.getText();
    let cleanedText = text.trim();
    assert.strictEqual(cleanedText, "user Registered Successfully");
 
});

When('I input already registerd credentials',{ timeout: 15000}, async function () {
     await driver.findElement(By.name("First_Name")).sendKeys("rayoy");
    await driver.findElement(By.name("Last_Name")).sendKeys("batenman");
    await driver.findElement(By.name("Email_")).sendKeys("rayo6700@gmail.com");
    await driver.findElement(By.name("Password_")).sendKeys("password123");
    await driver.findElement(By.id("signup_btn")).click();
});
 
Then('I should see an error message for sign up', { timeout: 15000 }, async function () {
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
    assert.strictEqual(cleanedText, "Error (auth/email-already-in-use).");
});

 
