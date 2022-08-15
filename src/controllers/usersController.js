const { User, Admin,Instrument } = require("../db");
const { users } = require("../users.json");
const { Op } = require("sequelize");
const { verifyToken } = require("../middlewares/authjwt");

const getUsers = async (req, res) => {
  try {
    let userName = req.query.userName;
    if (userName) {
      let users = await User.findAll({
        where: { userName: { [Op.iLike]: `%${userName}%` } },
      });
      if (users.length) return res.status(200).send(users);
      else return res.status(400).send("Users " + userName + " not found");
    } else {
      let users = await User.findAll();
      if (users.length) return res.status(200).send(users);
      else return res.status(200).send([]);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getUserToken = async (req, res) => {
  try {
    let id = req.user_id;
    if (id) {
      let userExist = await User.findByPk(id,{
        include:{model:Instrument}
      });
      if (!userExist) throw new TypeError("Error, User not found with this Id");
      return res.status(200).send(userExist);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
};

const postUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    if (userName && email && password) {
      const admin = await Admin.findOne({ where: { userName: userName } });
      if (admin) {
        throw new TypeError("Error, User exist");
      }
      await User.create(req.body);
      res.status(200).send({ ok: "User created!" });
    } else {
      throw new TypeError("Error, User information invalid");
    }
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const postUsersAll = async (req, res) => {
  try {
    let users = await User.findAll();
    if (!users) {
      await User.bulkCreate(users);
    }
    return res.send("Users created");
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const putUser = async (req, res) => {
  const {
    email,
    userName,
    password,
    rol,
    dni,
    firstName,
    lastName,
    contactNumber,
    buyerAddress,
  } = req.body;
  try {
    if (
      !email ||
      !userName ||
      !password ||
      !rol ||
      !dni ||
      !firstName ||
      !lastName ||
      !contactNumber ||
      !buyerAddress
    ) {
      throw new Error("Error, User information incomplete!!");
    } else {
      let userToPut = await User.findByPk(req.user_id);
      console.log("Usuario: ", userToPut);
      if (!userToPut) {
        throw new Error("Error, User doesn't exist");
      }

      User.findAll(userToPut.id).then((result) => {
        result.email = email;
        result.userName = userName;
        result.password = password;
        result.rol = rol;
        resultdni = dni;
        result.firstName = firstName;
        resul.lastName = lastName;
        result.contactNumber = contactNumber;
        result.buyerAddress = buyerAddress;
        return result.save();
      });
      return res.status(200).send("User updated");
    }
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const deleteUser = await User.destroy({
        where: { id: id },
      });
      if (!deleteUser) {
        throw new TypeError("Error, User Id not found");
      }
      res.status(200).send("User deleted");
    } else {
      throw new TypeError("Error, User Id invalid");
    }
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

module.exports = {
  postUser,
  postUsersAll,
  getUsers,
  getUserToken,
  deleteUser,
  putUser,
};
