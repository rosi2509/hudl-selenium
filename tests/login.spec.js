const { Builder } = require("selenium-webdriver");
require("dotenv").config(); // Load credentials from .env (never hardcode passwords!)

// Chai setup
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised").default || require("chai-as-promised");
chai.use(chaiAsPromised); 
const { expect } = chai;


// Import Page Object (keeps selectors and actions separate from tests)
const LoginPage = require("../src/LoginPage");
const testData = require("../src/test-data");

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
    await loginPage.login(
      testData.invalidCredentials.email,
      testData.invalidCredentials.password
    );  

    const error = await loginPage.waitForPasswordError();     // Wait for error
    const isDisplayed = await error.isDisplayed();
    expect(isDisplayed, "Expected error message to appear").to.be.true;
  });

  // Positive test → valid credentials should login
  it("should login successfully with valid credentials", async () => {
    await loginPage.open();                     
    await loginPage.login(
      testData.validCredentials.email,
      testData.validCredentials.password
    );
             
    const avatar = await loginPage.waitForSuccessfulLogin();  // Wait for avatar
    const isDisplayed = await avatar.isDisplayed();

    expect(isDisplayed, "Expected avatar to be visible after successful login").to.be.true;

  });
});