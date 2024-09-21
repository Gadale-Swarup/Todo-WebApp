const express = require("express");
const authorize = require("../middleware/auth");
const taskcontroller = require("../controllers/TaskControllers");
const router = express.Router();

router.post("/addtask", authorize.auth, taskcontroller.addtask);
router.post("/addCollaborator/:id", authorize.auth, taskcontroller.addCollaborator);
router.post("/getalltask", authorize.auth, taskcontroller.getalltask);
router.post("/gettaskbyid/:id", authorize.auth, taskcontroller.gettaskbyid);
router.put("/updatetask/:id", authorize.auth, taskcontroller.updatetask);
router.delete("/deletetask/:id", authorize.auth, taskcontroller.deleteTaskbyid);

router.get("/getFilteredTasks", authorize.auth, taskcontroller.getFilteredTasks);
router.get("/getTasksForUser", authorize.auth, taskcontroller.getTasksForUser);

module.exports = router;