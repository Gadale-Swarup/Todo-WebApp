const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Import bcrypt
const { ConnectionStates } = require("mongoose");

async function register(req, res) {
  const { Fname, Lname, username, email, password, agreeTerms } =
    req.body;
  try {
    const User = await UserModel.findOne({ username });
    if (!User) {
      // Hash the password before saving
      const image = req.file ? req.file.filename : null;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        Fname,
        Lname,
        username,
        email,
        password: hashedPassword, // Save the hashed password
        agreeTerms,
        profilepic:image,
      });

      await newUser.save();
      res
        .status(201)
        .send({
          newUser: newUser,
          Message: "User Registered Successfully",
          success: true,
        });
      console.log(newUser);
    } else {
      res.status(400).send({ Message: "User already exists", success: false });
    }
  } catch (error) {
    res.status(500).send({ Message: error.message, success: false });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    
    // Compare the plain text password with the hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).send({
        message: "User Logged In",
        User: username,
        token: token,
        success: true,
      });
      console.log(user);
    } else {
      return res
        .status(400)
        .send({ message: "Invalid login credentials", success: false });
    }
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
}

async function getUserInfo(req, res) {
  const id = req.user._id;
  try {
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      res.status(400).send({ message: "User not found.", success: false });
    } else {
      res.status(202).send({ user: user, success: true });
      console.log(user);
    }
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function updateById(req, res) {
  const id = req.user._id;
  try {
    if (!id) {
      res.send("User not found");
    }

    // If the password is being updated, hash it before saving
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const user = await UserModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    console.log(user);
    res.send({ message: "User updated successfully", success: true, user });
  } catch (error) {
    res.send("Error while updating", error);
  }
}

async function getalluser(req,res){
  try {
    const user = await UserModel.find();
    if(!user){
      res.status(400).send({ message: "Users not found."});
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error });
  }
}


module.exports = { register, login, getUserInfo, updateById,getalluser};
