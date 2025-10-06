// src/BasePage.js
const { until } = require("selenium-webdriver");
const config = require("./config");

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  // Navigate to a path relative to base URL
  async visit(path = "/") {
    const url = new URL(path, config.baseUrl).toString();
    await this.driver.get(url);
  }

  // Wait until element is located and visible
  async waitForVisible(locator, timeout = config.explicitTimeoutMs) {
    const el = await this.driver.wait(until.elementLocated(locator), timeout);
    await this.driver.wait(until.elementIsVisible(el), timeout);
    return el;
  }

  // Click element when it’s visible and enabled
  async clickWhenClickable(locator, timeout = config.explicitTimeoutMs) {
    const el = await this.waitForVisible(locator, timeout);
    await this.driver.wait(until.elementIsEnabled(el), timeout);
    await el.click();
    return el;
  }

  // Clear + type into element when it’s visible
  async typeWhenVisible(locator, text, timeout = config.explicitTimeoutMs) {
    const el = await this.waitForVisible(locator, timeout);
    await el.clear();
    await el.sendKeys(text);
    return el;
  }

  // Type into element
async type(locator, text, timeout = config.explicitTimeoutMs) {
  const el = await this.waitForVisible(locator, timeout);
  await el.clear();
  await el.sendKeys(text);
  return el;
}

// Click element
async click(locator, timeout = config.explicitTimeoutMs) {
  const el = await this.waitForVisible(locator, timeout);
  await el.click();
  return el;
}

}

module.exports = BasePage;
