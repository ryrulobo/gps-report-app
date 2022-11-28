const router = require("express").Router();
const ApiController = require("../controllers/api");
const authc = require("../middlewares/authc");

router.post("/signup", ApiController.register);
router.post("/login", ApiController.login);

router.use(authc);

router.get("/", ApiController.getAllData);
router.post("/logout", ApiController.logout);
router.get("/:deviceId", ApiController.getData);

module.exports = router;
