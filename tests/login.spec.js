const { Builder } = require("selenium-webdriver");
const assert = require("assert");
require("dotenv").config(); // Load credentials from .env (never hardcode passwords!)

// Import Page Object (keeps selectors and actions separate from tests)
const LoginPage = require("../src/LoginPage");

describe("Hudl Login", function () {
  // UI tests are slower than unit tests → increase timeout
  this.timeout(30000);

  let driver, loginPage;

  // Before all tests → start Edge browser
  before(async () => {
    driver = await new Builder().forBrowser("MicrosoftEdge").build();
    loginPage = new LoginPage(driver); // Create Page Object
  });

  beforeEach(async () => {
    await driver.manage().deleteAllCookies();
  });

  // After all tests → close browser
  after(async () => {
    if (driver) await driver.quit();
  });

  // Negative test → invalid credentials should show error
  it("should show error with invalid credentials", async () => {
    await loginPage.open();                                   // Go to login page
    await loginPage.login("fake@example.com", "wrongpassword"); // Try wrong login
    const error = await loginPage.waitForPasswordError();     // Wait for error
    assert.ok(await error.isDisplayed(), 
      "Expected error message to be displayed for invalid login");
  });

  // Positive test → valid credentials should login
  it("should login successfully with valid credentials", async () => {
    await loginPage.open();                                   // Go to login page
    await loginPage.login(process.env.HUDL_EMAIL, process.env.HUDL_PASSWORD); // Use .env creds
    const avatar = await loginPage.waitForSuccessfulLogin();  // Wait for avatar
    assert.ok(await avatar.isDisplayed(), 
      "Expected avatar to be displayed after successful login");
  });
});
