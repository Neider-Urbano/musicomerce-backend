//! Estructura de los mails (templates)

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
    this.html = `<div>
            <h1>MUSICCOMERCE</h1>
            <p>Username: ${userName}</p>
            <p>Password: ${password}</p>
            <a href="https://www.google.com">Ir a Musiccomerce</a>
        </div>`;
  }
  setHtmlShop(data) {
    this.html = data;
  }
  setHtmlUpdate(data) {
    this.html = data;
  }
}

module.exports = mailStructure;
