const express = require('express')
const authorize = require('../middleware/auth');
const categorycontroller =require('../controllers/categorycontrollers');

const router = express.Router();

router.post("/addcategory", authorize, categorycontroller.addcategory);
router.get("/getcategorybyid/:id", authorize, categorycontroller.getcategorybyid);
router.get("/getallcategory", authorize, categorycontroller.getallcategory);
router.put("/updatecategory/:id", authorize, categorycontroller.updatecategory);
router.delete("/deletecategory/:id", authorize, categorycontroller.deletecategory);

module.exports = router;