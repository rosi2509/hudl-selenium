const { Builder } = require("selenium-webdriver");
const config = require("./config");
const LoginPage = require("./LoginPage");

class BaseTest {
  constructor(options = {}) {
    this.driver = null;
    this.loginPage = null;
    this.browser = options.browser || config.browser || "MicrosoftEdge";
    this.headless = options.headless || config.headless || false;
  }

  async beforeAll() {
    // Build driver instance
    const builder = new Builder().forBrowser(this.browser);
    this.driver = await builder.build();
    this.loginPage = new LoginPage(this.driver);
  }

  async beforeEach() {
    // Clean session between tests
    if (this.driver) {
      await this.driver.manage().deleteAllCookies();
    }
  }

  async afterAll() {
    // Quit driver when done
    if (this.driver) {
      await this.driver.quit();
    }
  }

  getDriver() {
    return this.driver;
  }
}

module.exports = BaseTest;
