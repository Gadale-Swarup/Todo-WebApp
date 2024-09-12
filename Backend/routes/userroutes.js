const express = require("express");

const usercontroller = require("../controllers/UserControllers");


const router = express.Router();

router.post("/register", usercontroller.register);
router.post("/login", usercontroller.login);


module.exports = router;