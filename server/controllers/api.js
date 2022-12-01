const { Data, User, sequelize } = require("../models");
const { Op } = require("sequelize");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { getPagination } = require("../helpers/pagination");

class ApiController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      if (!name) throw { name: "Name is required" };
      if (!email) throw { name: "Email is required" };
      if (!password) throw { name: "Password is required" };

      const emailCheck = await User.findOne({ where: { email } });
      if (emailCheck) throw { name: "Email must be unique" };

      await User.create({ name, email, password });
      const findUser = await User.findOne({ where: { email } });

      res.status(201).json({
        id: findUser.id,
        username: findUser.name,
        email: findUser.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    //! Store and update token in database inspired from: https://youtu.be/TO51hGC5zDA
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "Email is required" };
      if (!password) throw { name: "Password is required" };

      const findUser = await User.findOne({ where: { email } });
      if (!findUser) throw { name: "Invalid email/password" };

      const validatePassword = comparePassword(password, findUser.password);
      if (!validatePassword) throw { name: "Invalid email/password" };

      const payload = { email: findUser.email, user_id: findUser.id };
      const loginToken = signToken(payload);

      let oldTokens = findUser.tokens || [];
      if (oldTokens.length) {
        oldTokens = oldTokens.filter((token) => {
          const timeDiff = (Date.now() - parseInt(token.signedAt)) / 1000;

          // Check if user last signed in is less than 1 day (86400 sec), means token isn't expired yet
          if (timeDiff < 86400) return token;
        });
      }

      // Update expired tokens (more than 1 day)
      await User.update(
        {
          tokens: [
            ...oldTokens,
            {
              token: loginToken,
              signedAt: Date.now().toString(),
            },
          ],
        },
        { where: { id: findUser.id } }
      );

      res.status(200).json({ response: { loginToken } });
    } catch (err) {
      next(err);
    }
  }

  static async logout(req, res, next) {
    //! Store and update token in database inspired from: https://youtu.be/TO51hGC5zDA
    try {
      if (req.headers && req.headers.logintoken) {
        const token = req.headers.logintoken;
        if (!token) throw { name: "Unauthorized" };

        const tokens = req.user.tokens;
        const newTokens = tokens.filter((t) => t.token !== token);

        // Clear tokens
        await User.update(
          {
            tokens: newTokens,
          },
          { where: { id: req.user.user_id } }
        );

        res.status(200).json({ message: "Logged out successfully" });
      }
    } catch (err) {
      next(err);
    }
  }

  static async getAllData(req, res, next) {
    try {
      let { page, size, q, id, type } = req.query;
      const { limit, offset } = getPagination(page - 1, size);
      const option = {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        limit,
        offset,
      };
      // Filter by DeviceId or DeviceType
      //! Search in multiple columns inspired from https://stackoverflow.com/a/62440393/20202353
      if (!!q) {
        option.where = {
          ...option.where,
          [Op.or]: {
            namesQuery: sequelize.where(
              sequelize.fn(
                "concat",
                sequelize.col("DeviceId"),
                sequelize.col("DeviceType")
              ),
              {
                [Op.iLike]: `%${q}%`,
              }
            ),
            DeviceId: { [Op.iLike]: `%${q}%` },
            DeviceType: { [Op.iLike]: `%${q}%` },
          },
        };
      }
      //! Order by DeviceId or DeviceType
      if (!id) id = "asc";
      if (!type) type = "asc";
      option.order = [
        ["DeviceType", `${type.toUpperCase()}`],
        ["DeviceId", `${id.toUpperCase()}`],
      ];

      const result = await Data.findAndCountAll(option);

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getData(req, res, next) {
    try {
      const { deviceId } = req.params;
      const result = await Data.findAll({
        where: {
          DeviceId: deviceId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ApiController;
