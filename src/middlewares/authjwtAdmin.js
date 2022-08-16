require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Admin } = require("../db");


const verifyTokenAdmin = async (req, res, next) => {
  try {
    const headerToken = req.get("Authorization");
    if (!headerToken) {
      return res.status(401).json({ error: "Token not found!" });
    }

    const token = headerToken.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if(!decoded.user_id) return res.status(401).send({error:"id not found"})
      req.user_id = decoded.user_id;
      req.user_rol = decoded.user_rol;

    verifyRol(req,res,next);

    } catch (error) {
      return res.status(401).send(error);
    }
  } catch (error) {
    return res.send(error);
  }
};

const verifyPilar = async (req, res, next) => {
  try {
    if (false) {
      next();
    } else {
        return res.status(401).send("Ups no llegue.");
    }
  } catch (error) {
    return res.send(error);
  }
};

const verifyRol = async (req, res, next) => {
    try {
        const admin=await Admin.findByPk(req.user_id);
        if(admin.rol===req.user_rol){
            next();
        }else{
            return res.status(401).send("Usted no tiene permiso.");
        }
    } catch (error) {
      return res.send(error);
    }
  };

module.exports = { verifyTokenAdmin, verifyPilar };
