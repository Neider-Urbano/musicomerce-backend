class mailStructure {
  constructor(to) {
    (this.from = '"MusiCommerce Store" <musicommercestore@gmail.com>'),
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
            <h1>Welcome to MusiCommerce</h1>
            <div>
              <h3>Summary of your information:</h3>
              <ul>
                <li>Username: ${userName}</li>
                <li>Password: ${password}</li>
              </ul>
            </div>
            <a href="https://www.google.com">Ir a Musiccomerce</a>
    </div>`;
  }
  setHtmlShop(name, phone, address, city, country, zip, total, items) {
    this.html = `
    <h2 style="color:#2B4570">PURCHASE SUMMARY</h2>
    </br>
    <div>
      <h3 style="color:#2B4570">SHIPPING INFORMATION</h3>
      </p>
      <p><b style="color:#5497A7">Name: </b>${name}</p>
      <p><b style="color:#5497A7">Phone: </b>${phone}</p>
      <p><b style="color:#5497A7">Address: </b>${address}</p>
      <p><b style="color:#5497A7">City: </b>${city}</p>
      <p><b style="color:#5497A7">Country: </b>${country}</p>
      <p><b style="color:#5497A7">Zip Code: </b>${zip}</p>
    </div>
    </br>
    </br>
    <div>
      <h3 style="color:#2B4570">PRODUCTOS</h3>
      <div>${items.map(
        (e) =>
          `<img src= ${e.img} style= "height:150px" "width=150px"/>
        <p><b style="color:#5497A7">Instrument:</b> ${e.name}</p>
        <p><b style="color:#5497A7">Units:</b> ${e.count}</p>
        <p><b style="color:#5497A7">unit price:</b> $${e.price}</p>
        `
      )}
      </div>
    </div>
    </br>
    </br>
    <h2 style="color:#2B4570"> Total amount paid: $${total}</h2>`;
  }

  setHtmlUpdate(
    //userName,
    //password,
    firstName,
    lastName,
    contactNumber,
    buyerAddress
  ) {
    this.html = `
    <div>
            <h1 style="color:#2B4570">YOU HAVE UPDATED YOUR PROFILE</h1>
            <div>
              <h3 style="color:#2B4570" >This is a summary of your changes</h3>
              <ul>
                <P><b style="color:#5497A7">Name</b>: ${firstName}</P>
                <P><b style="color:#5497A7">Last name:</b> ${lastName}</P>
                <P><b style="color:#5497A7">Contact Number:</b> ${contactNumber}</P>
                <P><b style="color:#5497A7">Address:<b> ${buyerAddress}</P>
              </ul>
            </div>
    </div>`;
  }

  setNewsletter(email) {
    this.html = `
    <div>
      <h1 style="color:#2B4570">Thank you for your subscription to MusiCommerce</h1>
      <h3>We will keep you informed</h3>
      <p>${email}</p>
    </div>
    `;
  }

  setResetPassword(email, token) {
    this.html = `
    <div>
      <h1 style="color:#2B4570">PASSWORD CHANGE</h1>
      <h3 style="color:#2B4570" >You have requested a password change from your email ${email}</h3>
      <h3>Click on the following link:</h3>
      <p>http://localhost:3000/user/resetpassword</p>
    </div>
    `;
  }

  setPassReseted(pass) {
    this.html = `
  <div>
    <h1 style="color:#2B4570">Successful password change</h1>
    <h4>This is your new password: </h4>
    <p>${pass}</p>
  </div>
  `;
  }
}

module.exports = mailStructure;
