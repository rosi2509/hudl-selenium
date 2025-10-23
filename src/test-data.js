require("dotenv").config();


const testData = {
  validCredentials: {
    email: process.env.HUDL_EMAIL,
    password: process.env.HUDL_PASSWORD,
  },
  invalidCredentials: {
    email: "fake@example.com",
    password: "wrongpassword",
  },
};


module.exports = testData;
