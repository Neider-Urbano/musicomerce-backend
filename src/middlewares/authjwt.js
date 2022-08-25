require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const headerToken = req.get("Authorization");
    if (!headerToken) {
      return res.status(401).json({ error: "Token not found!" });
    }

    const token = headerToken.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded.user_id)
        return res.status(401).send({ error: "id not found" });

      req.user_id = decoded.user_id;

      next();
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
      res.send("Ups no llegue");
    }
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

module.exports = { verifyToken, verifyPilar };
