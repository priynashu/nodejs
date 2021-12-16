const express = require("express");
const router = express.Router();
//middleware
const { authCheck, adminCheck } = require("../middlewares/auth");
//controllers
const { createOrUpdate, currentUser } = require("../controllers/auth");
router.post("/create-or-update-user", authCheck, createOrUpdate); // here the authCheck will run first
// so we can validate the token obtain from firebase in this authCheck function in middleware auth file

router.post("/current-user", authCheck, currentUser); //currentUser response user
router.post("/current-admin", authCheck, adminCheck, currentUser);
//this will give response only if it would be admin
module.exports = router;
