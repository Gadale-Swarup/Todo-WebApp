const express = require("express");
const usercontroller = require("../controllers/UserControllers");
const authorize = require('../middleware/auth')
const router = express.Router();

router.post("/register", usercontroller.register);
router.post("/login", usercontroller.login);
router.post('/getUserInfo',authorize.auth, usercontroller.getUserInfo);
router.get('/getalluser',authorize.auth, usercontroller.getalluser);
router.put('/updatebyid/:id',authorize.auth, usercontroller.updateById);


module.exports = router;