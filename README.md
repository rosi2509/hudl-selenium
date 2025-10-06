# Hudl Login Automation (Selenium + Mocha + JavaScript)

This project automates the **Hudl login flow** using Selenium WebDriver and the **Page Object Model (POM)** design pattern.  
It includes both **positive (valid login)** and **negative (invalid login)** test scenarios, written with **Mocha** as the test runner and **Node.js** for execution.

---

## Overview

The framework demonstrates best practices for UI test automation:
- Clean **Page Object Model** for maintainability.
- **Explicit waits** to reduce test flakiness.
- **Environment-driven configuration** via `.env` and `config.js`.
- **Separation of test logic and page logic** for scalability.

---

## Tech Stack

| Category | Tool / Library |
|-----------|----------------|
| Language | JavaScript (Node.js) |
| Test Runner | Mocha |
| Assertions | Node.js `assert` |
| Automation | Selenium WebDriver |
| Browser | Microsoft Edge (can switch to Chrome easily) |
| Config Management | dotenv (`.env` file) |

---

## Project Structure

hudl-selenium/

**src/**

  -BasePage.js → shared helper methods (click, type, waitForVisible, etc.)

  -LoginPage.js → Page Object for the Hudl login page

  -config.js → centralized configuration (URLs, timeouts, headless mode)

**tests/**

  -login.spec.js → positive and negative login test cases

**.env** → stores sensitive credentials (not committed to GitHub)
**.gitignore**→ excludes node_modules, logs, .env, etc.
**package.json** → project metadata, dependencies, and scripts

**README.md** → project documentation and setup guide

---

##  Setup Instructions

### 1️⃣ Clone the repository

git clone https://github.com/YOUR_USERNAME/hudl-selenium.git
cd hudl-selenium

2️⃣ Install dependencies

npm install

3️⃣ Create a .env file

In the project root, create a file named .env and add your Hudl credentials:

HUDL_EMAIL=your-email@example.com
HUDL_PASSWORD=your-password

4️⃣ Run the tests

npm test

🧪 Test Scenarios
| Test Name                                            | Description                                                                 |
| ---------------------------------------------------- | --------------------------------------------------------------------------- |
| **should show error with invalid credentials**       | Verifies Hudl shows the correct error message when credentials are invalid. |
| **should login successfully with valid credentials** | Verifies that valid credentials log the user in and show the user avatar.   |
.

🏗 Future Enhancements

- **Add tests for "Login with Google / Apple / Facebook".**
- **Add HTML reporting (e.g., Mochawesome)**
- **Parameterize tests for multiple environments (staging, prod**


👤 Author
Rosibel Ramirez

Test Automation Engineer

📧 rosibel.ramirez2509@gmail.com
