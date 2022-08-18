const { Admin } = require("../db");
const { Op } = require("sequelize");

const getAdmins = async (req, res) => {
  try {
    let userName = req.query.userName;
    if (userName) {
      let admins = await Admin.findAll({
        where: { userName: { [Op.iLike]: `%${userName}%` } },
      });
      if (admins.length) return res.status(200).send(admins);
      else return res.status(400).send("Admin " + userName + " not found");
    } else {
      let admins = await Admin.findAll({
        where: {
          id: {
            [Op.ne]: req.user_id
          }
        }
      });
      if (admins.length) return res.status(200).send(admins);
      else return res.status(200).send([]);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const createtAdmin = async (req, res) => {
  const { userName, password, firstName, lastName, email, rol } = req.body;
  try {
    if (
      userName &&
      email &&
      password &&
      firstName &&
      lastName &&
      email &&
      rol
    ) {
      await Admin.create(req.body);
      res.status(200).send("Admin created");
    } else {
      throw new TypeError("Error, Admin information invalid");
    }
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const deleteAdmin = async (req, res) => {
  const { id } = req.body;
  try {
    if (id) {
      const deleteAdmin = await Admin.findByPk(id);
      if (!deleteAdmin) {
        throw new TypeError("Error, Admin Id not found");
      }
      deleteAdmin.rol = "banned";
      await deleteAdmin.save();
      res.status(200).send("Admin deleted");
    } else {
      throw new TypeError("Error, Admin Id invalid");
    }
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const modifyAdmin = async (req, res) => {
  const { id, userName, password, firstName, lastName, email,rol } = req.body;
  try {
    if (!userName || !password || !firstName || !lastName || !email || !rol) {
      throw new Error("Error, Admin information incomplete!!");
    } else {
      let modifyAdmin = await Admin.findByPk(id);
      if (!modifyAdmin) {
        throw new Error("Error, Admin doesn't exist");
      }

      modifyAdmin.userName = userName;
      modifyAdmin.firstName = firstName;
      modifyAdmin.lastName = lastName;
      modifyAdmin.email = email;
      modifyAdmin.password = password;
      modifyAdmin.rol = rol;
      
      await modifyAdmin.save();
      return res.status(200).send("Admin updated");
    }
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const getAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const idAdmin = await Admin.findByPk(id);
      idAdmin
        ? res.status(200).send(idAdmin)
        : res.status(404).send(`Admin ${id} not found`);
    }
  } catch (e) {
    return res.status(400).send(e.message);
  }
};
module.exports = {
  getAdmins,
  createtAdmin,
  deleteAdmin,
  modifyAdmin,
  getAdminById,
};
