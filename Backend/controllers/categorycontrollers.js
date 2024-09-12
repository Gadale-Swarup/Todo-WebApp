const mongoose = require("mongoose");
const categorymodel = require("../models/category");
const jwt = require("jsonwebtoken");

async function addcategory(req, res) {
  console.log(req.body);
  const userid = req.user._id;
  const { Cname, createdBy, createdAt } = req.body;
  try {
    const existingcategory = await categorymodel.findOne({ Cname });
    if (existingcategory) {
      return res.status(400).send({ message: "Category Already Exists" });
    } else {
      const newcategory = new categorymodel({
        Cname,
        createdBy: userid,
        createdAt: Date.now(),
      });
      await newcategory.save();
      res.status(201).send({ message: "Category Added Sucessfully" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getcategorybyid(req, res) {
  console.log(req.body);
  const { id } = req.params;
  try {
    const category = await categorymodel.findById(id);
    console.log(id);
    if (!category) {
      res.status(404).send({ msg: "category id is not found" });
    }
    return res.status(201).send({
      Cname: category.Cname,
      createdBy: category.createdBy,
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getallcategory(req, res) {
  try {
    const category = await categorymodel.find();
    res.status(201).send({ category: category });
  } catch (error) {
    res.status(500).send(error.message);
  }
}


async function updatecategory(req, res) {
  console.log(req.body);
  const { Cname, createdBy } = req.body;
  const { id } = req.params;

  try {
    const category = await categorymodel.findByIdAndUpdate(id);
    if (!category) {
      res.status(404).send({ message: "Category Not Found" });
    }
    category.Cname = Cname || category.Cname;
    category.createdBy = createdBy || category.createdBy;
    await category.save();
    res.status(201).send({ message: "Category Updated Sucessfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
}


async function deletecategory(req, res) {
  console.log(req.body);
  const { id } = req.params;
  try {
    const category = await categorymodel.findByIdAndDelete(id);
    if (!category) {
      res.status(404).send({ message: "Category Not Found" });
    }
    res.status(201).send({ message: "Category Deleted Sucessfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  addcategory,
  getcategorybyid,
  getallcategory,
  updatecategory,
  deletecategory,
};