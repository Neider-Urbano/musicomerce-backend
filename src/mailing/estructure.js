class mailStructure {
  constructor(to) {
    (this.from = '"Tigers Developers 💻👱🏼" <tigersdevelopers22@gmail.com>'),
      (this.to = to),
      (this.subject = ""),
      (this.text = ""),
      (this.html = "");
  }
  setTo(data) {
    this.to = data;
  }
  setSubject(data) {
    this.subject = data;
  }
  setText(data) {
    this.text = data;
  }
  setHtmlRegister(userName, password) {
    this.html = `
    <div>
            <h1>Bienvenid@ a MusiCommerce</h1>
            <div>
              <h3>Este es un resumen de tu información</h3>
              <ul>
                <li>Username: ${userName}</li>
                <li>Password: ${password}</li>
              </ul>
            </div>
            <a href="https://www.google.com">Ir a Musiccomerce</a>
    </div>`;
  }
  setHtmlShop(data) {
    this.html = data;
  }
  setHtmlUpdate(
    userName,
    password,
    dni,
    firstName,
    lastName,
    contactNumber,
    buyerAddress
  ) {
    this.html = `
    <div>
            <h1>Tus datos han sido actualizados</h1>
            <div>
              <h3>Este es un resumen de tu perfil</h3>
              <ul>
                <li>Nombre: ${firstName}</li>
                <li>Apellido: ${lastName}</li>
                <li>DNI: ${dni}</li>
                <li>Numero de contacto: ${contactNumber}</li>
                <li>Direccion: ${buyerAddress}</li>
                <li>User: ${userName}</li>
                <li>Password: ${password}</li>
              </ul>
            </div>
    </div>`;
  }
}

module.exports = mailStructure;
