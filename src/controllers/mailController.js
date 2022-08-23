require("dotenv").config();
const mailStructure = require("../mailing/estructure");
const transporter = require("../mailing/mailing");

const mailSignUp = async (req, res) => {
  const { email, userName, password } = req.body;
  const mailSignup = new mailStructure(email);
  mailSignup.setTo(email);
  mailSignup.setSubject(`Bienvenido a MusciCommerce ${userName}`);
  mailSignup.setHtmlRegister(userName, password);

  const info = {
    from: mailSignup.from,
    to: mailSignup.to,
    subject: mailSignup.subject,
    html: mailSignup.html,
  };

  await transporter.sendMail(info);
  res.status(200).send("Mail enviado");
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
  userProfile.setSubject(`Has actualizado tu perfil`);
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
  res.status(200).send("Mail enviado");
};

const mailPurchase = async (req, res) => {
  const { name, email, phone, address, city, country, zip, total, items } =
    req.body;

  const mailShop = new mailStructure(email);
  mailShop.setTo(email);
  mailShop.setSubject(`Resumen de tu compra`);
  mailShop.setHtmlShop(name, phone, address, city, country, zip, total, items);

  const info = {
    from: mailShop.from,
    to: mailShop.to,
    subject: mailShop.subject,
    html: mailShop.html,
  };

  await transporter.sendMail(info);
  res.status(200).send("Mail enviado");
};

const mailNewsletter = async (req, res) => {
  const { email } = req.body;

  const mailNews = new mailStructure(email);
  mailNews.setTo(email);
  mailNews.setSubject("Bienvenido a nuestro Newsletter");
  mailNews.setNewsletter(email);

  const info = {
    from: mailNews.from,
    to: mailNews.to,
    subject: mailNews.subject,
    html: mailNews.html,
  };

  await transporter.sendMail(info);
  res.status(200).send("Mail enviado");
};

const mailResetPassword = async (req, res) => {
  const { email } = req.body;

  const mailPassword = new mailStructure(email);
  mailPassword.setTo(email);
  mailPassword.setSubject("Solicitud Nueva Contraseña");
  mailPassword.setResetPassword(email);

  const info = {
    from: mailPassword.from,
    to: mailPassword.to,
    subject: mailPassword.subject,
    html: mailPassword.html,
  };

  await transporter.sendMail(info);
  res.status(200).send("Mail enviado");
};

const mailAdmin = async (req, res) => {
  const { email } = req.body;

  const mailPassword = new mailStructure(email);
  mailPassword.setTo(email);
  mailPassword.setSubject("Solicitud Nueva Contraseña");
  mailPassword.setResetPasswordAdmin(email);

  const info = {
    from: mailPassword.from,
    to: mailPassword.to,
    subject: mailPassword.subject,
    html: mailPassword.html,
  };

  await transporter.sendMail(info);
  res.status(200).send("Mail enviado");
};

const mailPassReseted = async (req, res) => {
  const { email, pass } = req.body;

  const passRested = new mailStructure(email);
  passRested.setTo(email);
  passRested.setSubject("Contraseña Actualizada");
  passRested.setPassReseted(pass);

  const info = {
    from: passRested.from,
    to: passRested.to,
    subject: passRested.subject,
    html: passRested.html,
  };

  await transporter.sendMail(info);
  res.status(200).send("Mail enviado");
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
