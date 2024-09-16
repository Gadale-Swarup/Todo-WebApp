const express = require("express");
const authorize = require("../middleware/auth");
const prioritycontroller = require("../controllers/prioritycontrollers");
const router = express.Router();

router.post("/addpriority", authorize.authauth, prioritycontroller.addpriority);
router.post("/getprioritybyid/:id", authorize.auth, prioritycontroller.getprioritybyid);
router.get("/getallpriority", authorize.auth, prioritycontroller.getallpriority);
router.put("/updatepriority/:id", authorize.auth, prioritycontroller.updatepriority);
router.delete("/deletepriority/:id", authorize.auth, prioritycontroller.deletepriority);

module.exports = router;