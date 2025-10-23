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

// Take a screenshot and save to /screenshots folder
async takeScreenshot(filename) {
  try {
    const screenshot = await this.driver.takeScreenshot();
    const fs = require("fs");
    const path = require("path");
    const dir = path.join(__dirname, "../screenshots");


    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }


    fs.writeFileSync(`${dir}/${filename}.png`, screenshot, "base64");
    console.log(`Screenshot saved: ${dir}/${filename}.png`);
  } catch (err) {
    console.error("Failed to take screenshot:", err);
  }
}


// Safe click — retries click and takes screenshot if it fails
async safeClick(locator, timeout = 10000) {
  try {
    const element = await this.waitForVisible(locator, timeout);
    await element.click();
  } catch (error) {
    console.error("Click failed, capturing screenshot...");
    await this.takeScreenshot(`click-error-${Date.now()}`);
    throw error;
  }


}
}

module.exports = BasePage;
