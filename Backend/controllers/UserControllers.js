const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { Fname, Lname, username, email, password, profilepic ,agreeTerms} = req.body;
  try {
    const User = await UserModel.findOne({ username });
    if (!User) {
      const newUser = new UserModel({
        Fname,
        Lname,
        username,
        email,
        password,
        agreeTerms,
        profilepic,
      });

      await newUser.save();
      res.status(201).send({ newUser:newUser,Message: "User Registered Successfully", success: true });
      console.log(newUser)
    } else {
      res.status(400).send({ Message: "User already exits", success: false });
    }
  } catch (error) {
    res.status(500).send({ Message: error.message, success: false });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (user && (await user.comparePassword(password))) {
      // const payload ={};
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({
          message: "User Logged In",
          User: username,
          token: token,
          success: true,
        });
        console.log(user)
    } else {
      return res.status(400).send({ message: "Invalid login credentials" ,success: false});
    }
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
}

async function getUserInfo(req, res) {
  const id = req.user._id;
  try {
    const user = await UserModel.findOne({ _id:id});
    console.log(user);
    if (!user) {
      res.status(400).send({ message: "User does not found.", success: false });
    } else {
      res.status(202).send({ user: user, success: true });
      console.log(user);
    }
  } catch (error) {
    res.status(500).send({ error });
  }
}

module.exports = { register, login, getUserInfo };
