require("dotenv").config();

const config = {
  baseUrl: process.env.BASE_URL || "https://www.hudl.com",
  loginPath: process.env.LOGIN_PATH || "/login",
  explicitTimeoutMs: Number(process.env.EXPLICIT_TIMEOUT_MS || 10000),
};

module.exports = config;
