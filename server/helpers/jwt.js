const jwt = require("jsonwebtoken");

const signToken = (payload) =>
  jwt.sign(payload, process.env.jwt_secret, { expiresIn: "1d" });

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.jwt_secret);
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw { name: "Token expired" };
    }
  }
};

module.exports = { signToken, verifyToken };
