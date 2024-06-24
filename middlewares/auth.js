const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { HttpError } = require("../helpers");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({
      status: "error",
      message: "Not authorized",
      data: "Unauthorized",
    });
  }
  
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Not authorized",
        data: "Unauthorized",
      });
    }
    
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: "error",
        message: "Not authorized - Invalid token",
        data: "Unauthorized",
      });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "error",
        message: "Not authorized - Token expired",
        data: "Unauthorized",
      });
    }
    return res.status(401).json({
      status: "error",
      message: "Not authorized",
      data: "Unauthorized",
    });
  }
};

module.exports = auth;
