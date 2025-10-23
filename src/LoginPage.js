const { By ,Key} = require("selenium-webdriver");
const BasePage = require("./BasePage"); // helper methods
const config = require("./config");     // env config
const testData = require ("../src/test-data");

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);

    // Locators
    this.emailField = By.id("username");
    this.continueButton = By.css("button[data-action-button-primary='true']");
    this.passwordField = By.id("password");
    this.passwordError = By.id("error-element-password");
    this.userAvatar = By.css(".uni-avatar__content-container");
  }

  // Open login page
  async open() {
    await this.visit(config.baseUrl + config.loginPath);
    await this.waitForVisible(this.emailField);
  }

  // Perform login
  async login(email, password) {

    await this.type(this.emailField, email);
    await this.click(this.continueButton);
    await this.waitForVisible(this.passwordField);
    await this.type(this.passwordField, password);
    await this.driver.findElement(this.passwordField).sendKeys(Key.ENTER);
  }

  // Wait for error after failed login
  async waitForPasswordError() {
    return this.waitForVisible(this.passwordError);
  }

  // Wait for avatar after successful login
  async waitForSuccessfulLogin() {
    return this.waitForVisible(this.userAvatar);
  }
}

module.exports = LoginPage; // 