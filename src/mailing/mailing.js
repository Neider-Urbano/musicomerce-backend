require("dotenv").config();
const Config = require("./config");
const { PASS_GMAIL, USER_GMAIL, HOST_GMAIL } = process.env;

//! ESTO ES EL TRANSPORTER
const transporter = new Config({
  host: HOST_GMAIL,
  port: 465,
  secure: true,
  auth: {
    user: USER_GMAIL,
    pass: PASS_GMAIL,
  },
});

module.exports = transporter;
