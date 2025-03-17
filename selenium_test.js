const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function testDriver() {
  try {
    console.log("Building WebDriver...");
    const driver = await new Builder()
      .forBrowser('chrome')
      // You can optionally set chrome options here if needed:
      .setChromeOptions(new chrome.Options())
      .build();
    console.log("WebDriver built successfully!");
    await driver.quit();
  } catch (error) {
    console.error("Error building WebDriver:", error);
  }
})();
