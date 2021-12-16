const express = require("express");
const router = express.Router();
//middleware
const { authCheck, adminCheck } = require("../middlewares/auth");
//controllers
const { create, read, update, remove, list } = require("../controllers/sub");
//routes
router.post("/sub", authCheck, adminCheck, create);
router.get("/sub/:slug", read);
router.put("/sub/:slug", authCheck, adminCheck, update);
router.get("/subs", list);
router.delete("/sub/:slug", authCheck, adminCheck, remove);

module.exports = router;
