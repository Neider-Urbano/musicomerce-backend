require("dotenv").config();
const mailStructure = require("../mailing/estructure");
const transporter = require("../mailing/mailing");

const mailSignUp = async (req, res) => {
  const { email, userName, password } = req.body;
  const mailSignup = new mailStructure(email);
  mailSignup.setTo(email);
  mailSignup.setSubject(`Welcome to MusiCommerce ${userName}`);
  mailSignup.setHtmlRegister(userName, password);

  const info = {
    from: mailSignup.from,
    to: mailSignup.to,
    subject: mailSignup.subject,
    html: mailSignup.html,
  };

  await transporter.sendMail(info);
  res.status(200).send("Mail send");
  /* .catch(res.status(404).send("Algo salio mal")); */
};

const modifyUserProfile = async (req, res) => {
  const {
    email,
    //userName,
    //password,
    firstName,
    lastName,
    contactNumber,
    buyerAddress,
  } = req.body;

  const userProfile = new mailStructure(email);

  userProfile.setTo(email);
  userProfile.setSubject(`Your profiled has been updated`);
  userProfile.setHtmlUpdate(
    //userName,
    //password,
    firstName,
    lastName,
    contactNumber,
    buyerAddress
  );

  const info = {
    from: userProfile.from,
    to: userProfile.to,
    subject: userProfile.subject,
    html: userProfile.html,
  };

  await transporter.sendMail(info);
  res.status(200).send("Mail send");
};

const mailPurchase = async (req, res) => {
  const { name, email, phone, address, city, country, zip, total, items } =
    req.body;

  const mailShop = new mailStructure(email);
  mailShop.setTo(email);
  mailShop.setSubject(`Your purchase summary`);
  mailShop.setHtmlShop(name, phone, address, city, country, zip, total, items);

  const info = {
    from: mailShop.from,
    to: mailShop.to,
    subject: mailShop.subject,
    html: mailShop.html,
  };

  await transporter.sendMail(info);
  res.status(200).send("Mail send");
};

const mailNewsletter = async (req, res) => {
  const { email } = req.body;

  const mailNews = new mailStructure(email);
  mailNews.setTo(email);
  mailNews.setSubject("Welcome to our Newsletter");
  mailNews.setNewsletter(email);

  const info = {
    from: mailNews.from,
    to: mailNews.to,
    subject: mailNews.subject,
    html: mailNews.html,
  };

  await transporter.sendMail(info);
  res.status(200).send("Mail send");
};

const mailResetPassword = async (req, res) => {
  const { email } = req.body;

  const mailPassword = new mailStructure(email);
  mailPassword.setTo(email);
  mailPassword.setSubject("New Password Request");
  mailPassword.setResetPassword(email);

  const info = {
    from: mailPassword.from,
    to: mailPassword.to,
    subject: mailPassword.subject,
    html: mailPassword.html,
  };

  await transporter.sendMail(info);
  res.status(200).send("Mail send");
};

const mailAdmin = async (req, res) => {
  const { email } = req.body;

  const mailPassword = new mailStructure(email);
  mailPassword.setTo(email);
  mailPassword.setSubject("New Password Request");
  mailPassword.setResetPasswordAdmin(email);

  const info = {
    from: mailPassword.from,
    to: mailPassword.to,
    subject: mailPassword.subject,
    html: mailPassword.html,
  };

  await transporter.sendMail(info);
  res.status(200).send("Mail send");
};

const mailPassReseted = async (req, res) => {
  const { email, pass } = req.body;

  const passRested = new mailStructure(email);
  passRested.setTo(email);
  passRested.setSubject("Password updated");
  passRested.setPassReseted(pass);

  const info = {
    from: passRested.from,
    to: passRested.to,
    subject: passRested.subject,
    html: passRested.html,
  };

  await transporter.sendMail(info);
  res.status(200).send("Mail send");
};

module.exports = {
  mailSignUp,
  modifyUserProfile,
  mailPurchase,
  mailNewsletter,
  mailResetPassword,
  mailPassReseted,
  mailAdmin,
};
