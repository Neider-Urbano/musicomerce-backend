const { User, Admin, Instrument } = require("../db");
const { users } = require("../users.json");
const { Op } = require("sequelize");
const { verifyToken } = require("../middlewares/authjwt");
const bcrypt = require("bcrypt");

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
      let userExist = await User.findByPk(id, {
        include: { model: Instrument },
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
      const admin = await Admin.findOne({
        where: { [Op.and]: [{ userName: userName }, { email: email }] },
      });
      if (admin) {
        throw new TypeError("Error, User exist");
      }

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
  const { firstName, lastName, contactNumber, buyerAddress } = req.body;
  try {
    if (!firstName || !lastName || !contactNumber || !buyerAddress) {
      throw new Error({ error: "Error, User information incomplete!!" });
    } else {
      let userToPut = await User.findByPk(req.user_id);
      if (!userToPut) {
        throw new Error({ error: "Error, User doesn't exist" });
      }
      await User.findByPk(req.user_id).then((result) => {
        result.firstName = firstName;
        result.lastName = lastName;
        result.contactNumber = contactNumber;
        result.buyerAddress = buyerAddress;
        result.save();
        return res.status(200).send({ ok: "User information updated :)" });
      });
    }
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const putUserAdmin = async (req, res) => {
  const {
    //email,
    //userName,
    rol,
    //dni,
    firstName,
    lastName,
    contactNumber,
    buyerAddress,
  } = req.body;
  try {
    if (
      //!email ||
      //!userName ||
      !rol ||
      //!dni ||
      !firstName ||
      !lastName ||
      !contactNumber ||
      !buyerAddress
    ) {
      throw new Error("Error, User information incomplete!!");
    } else {
      let userToPut = await User.findByPk(req.body.id);
      if (!userToPut) {
        throw new Error("Error, User doesn't exist");
      }
      await User.findByPk(userToPut.id).then((result) => {
        //result.email = email;
        //result.userName = userName;
        result.rol = rol;
        //result.dni = dni;
        result.firstName = firstName;
        result.lastName = lastName;
        result.contactNumber = contactNumber;
        result.buyerAddress = buyerAddress;
        result.save();
        return res.status(200).send("User updated");
      });
    }
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const deleteUser = await User.findByPk(id);
      if (!deleteUser) {
        throw new TypeError("Error, User Id not found");
      }
      deleteUser.rol = "banned";
      await deleteUser.save();
      res.status(200).send("User deleted");
    } else {
      throw new TypeError("Error, User Id invalid");
    }
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const deleteUserAccount = async (req, res) => {
  let id = req.user_id;
  try {
    const userDeleted = await User.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send("User deleted");
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const getUserMail = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findByPk(req.user_id);
    console.log("ID USUARIO", user.id);
    if (user) {
      if (user.email == email) {
        res.status(200).send(user.email);
        console.log("EL CORREO", user.email);
      } else {
        res.send("EMAIL NO ECNONTRADO");
      }
    }
  } catch (error) {}
};

const putPasswordUser = async (req, res) => {
  const { email, pass } = req.body;
  try {
    if (!email || !pass) {
      throw new Error({ error: "Error, User information incomplete!!" });
    } else {
      let userToPut = await User.findOne({ where: { email: email } });
      userToPut
        ? await User.findOne({ where: { email: email } }).then((result) => {
            result.email = email;
            result.set({ password: pass });

            result.save().then(() => {
              return res
                .status(200)
                .send({ ok: "User information updated :)" });
            });
          })
        : await Admin.findOne({ where: { email: email } }).then((result) => {
            result.email = email;
            result.set({ password: pass });

            result.save().then(() => {
              return res
                .status(200)
                .send({ ok: "Admin information updated :)" });
            });
          });
    }
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

/* if (!userToPut) {
  await Admin.findOne({ where: { email: email } }).then((result) => {
    result.email = email;
    result.set({ password: pass });

    result.save().then(() => {
      return res.status(200).send({ ok: "Admin information updated :)" });
    });
  });
} */
module.exports = {
  postUser,
  postUsersAll,
  getUsers,
  getUserToken,
  deleteUser,
  putUser,
  putUserAdmin,
  deleteUserAccount,
  putPasswordUser,
  getUserMail,
};
