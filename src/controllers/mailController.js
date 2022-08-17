require("dotenv").config();
const mailStructure = require("../mailing/estructure");
const transporter = require("../mailing/mailing");

/* const sendMail = async (req, res) => {
  const { userName, mail } = req.body;
  //enviar desde correo no-correo
  //let testAccount = await nodemailer.createTestAccount();

  //transporter object usando SMTP => datos del usuario
  let transporter = nodemailer.createTransport({
    host: HOST_GMAIL,
    port: 465,
    secure: true, // true for 465, false for other ports => false for 587 correo ficticio
    auth: {
      user: USER_GMAIL,
      pass: PASS_GMAIL,
    },
  });

  //enviar el mail con el transportador definido
  let mailInfo = await transporter.sendMail({
    from: "MusiCommerce <musicommercestore@gmail.com>",
    to: mail,
    subject: `Bienvenido ${userName}`,
    text: "Prueba para ver que es esto",
    html: `
  <head>
      <h1>MusiCommerce te da la bienvenida ${userName} </h1>
  </head>
  <body>
      <h1>Resumen de tu información</h1>
      <ul>
          <li>Username:${userName}</li>
          <li>Email:${mail}</li>
          <p>Sigue disfrutando en este enlace http://localhost:3000/ </p>
      </ul
  </body>
`,
  });
  console.log("mensaje enviado");
  res.send("mensaje enviado");
}; */

//!recibo info desde boton signUp
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

module.exports = {
  mailSignUp,
};
