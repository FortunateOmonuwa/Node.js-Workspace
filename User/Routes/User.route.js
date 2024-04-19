const express = require("express");
const router = express.Router();
const { RegisterUsers, Login } = require("../Controllers/user.controller");
module.exports = router;

router.post("/", RegisterUsers);
router.post("/login", Login);
