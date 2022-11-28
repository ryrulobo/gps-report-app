const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "GPS Report App",
  });
});

router.use("/api", apiRouter);

module.exports = router;
