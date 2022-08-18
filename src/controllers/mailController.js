require("dotenv").config();
const mailStructure = require("../mailing/estructure");
const transporter = require("../mailing/mailing");

const mailSignUp = async (req, res) => {
  const { mail, userName, password } = req.body;
  const mailSignup = new mailStructure(mail);
  mailSignup.setTo(mail);
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
    userName,
    password,
    dni,
    firstName,
    lastName,
    contactNumber,
    buyerAddress,
  } = req.body;

  const userProfile = new mailStructure(email);

  userProfile.setTo(email);
  userProfile.setSubject(`${userName} has actualizado tu perfil`);
  userProfile.setHtmlUpdate(
    userName,
    password,
    dni,
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

/* const mailPurchase = async (req, res) => {
  const {} = req.body;
}; */

module.exports = {
  mailSignUp,
  modifyUserProfile,
  //mailPurchase
};
