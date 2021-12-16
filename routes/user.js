const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => {
  res.json({
    data: "hey you hit the user  node api",
  });
});

module.exports = router;
