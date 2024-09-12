const express = require("express");
const auth = require("../middleware/auth");
const taskcontroller = require("../controllers/TaskControllers");
const router = express.Router();

router.post("/addtask", auth, taskcontroller.addtask);
router.post("/addCollaborator/:id", auth, taskcontroller.addCollaborator);
router.get("/getalltask", auth, taskcontroller.getalltask);
router.put("/updatetask/:id", auth, taskcontroller.updatetask);
router.delete("/deletetask/:id", auth, taskcontroller.deleteTaskbyid);

module.exports = router;