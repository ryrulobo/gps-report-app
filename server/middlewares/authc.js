const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");
const e = require("express");

async function authc(req, res, next) {
  try {
    const loginToken = req.headers.logintoken;
    if (!loginToken) throw { name: "Unauthorized" };

    const decodedToken = verifyToken(loginToken);

    const findUser = await User.findByPk(decodedToken.user_id);
    // console.log(findUser, "ini find user");
    if (!findUser) {
      throw { name: "Invalid token" };
    } else {
      req.user = {
        user_id: findUser.id,
        name: findUser.name,
        tokens: findUser.tokens,
      };
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authc;
