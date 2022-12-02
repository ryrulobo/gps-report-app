const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

async function authc(req, res, next) {
  try {
    const loginToken = req.headers.logintoken;
    if (!loginToken) throw { name: "Unauthorized" };

    const decodedToken = verifyToken(loginToken);
    if (!decodedToken) throw { name: "Invalid token" };

    const findUser = await User.findByPk(decodedToken.user_id);

    const tokenCheck = findUser.tokens.find((e) => e.token == loginToken);

    if (!findUser || !tokenCheck) {
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
