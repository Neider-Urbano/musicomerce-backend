const { User } = require("../db.js");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const controllerRegister = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!email || !password || !userName) { throw new Error("Password, userName or Email is required") }
    const user = await User.findOne({ where: { email: email } });

    if (user)
      return res.status(409).json({ error: "User/Email Already Exists" });
    await User.create(req.body);
    return res.status(201).json({ ok: "User created!" });
  } catch (error) {
    return res.status(404).send(error.message);
  }
}

const controllerLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password)
      throw new TypeError("userName or Password is required")

    const user = await User.findOne({ where: { userName: userName } });

    if (!user)
      throw new TypeError("Username or Password invalid.");

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      throw new TypeError("Username or Password invalid.");
    }
    const token = jwt.sign({ user_id: user.id, user_rol: user.rol },process.env.JWT_SECRET);

    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(404).send(error.message);
  }
}
const verifyToken = async (req, res, next) => {
  try {
    const BearesToken = req.get("Authorization");

    if (!BearesToken) return res.status(401).send({ error: "token not found" })

    const token = BearesToken.replace("Bearer ", "")
    try {

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if(!decoded.user_id) return res.status(401).send({error:"id not found"})
      req.user_id = decoded.user_id;
      next();
    } catch (e) {
      console.log(e)
      return res.status(400).send(e)
    }

  } catch (e) {
    console.log(e)
    return res.status(400).send(e)
  }
}

module.exports = {
  controllerLogin,
  controllerRegister,
  verifyToken
};