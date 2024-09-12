const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { Fname, Lname, username, email, password, profilepic } = req.body;
  try {
    const User = await UserModel.findOne({ username });
    if (!User) {
      const newUser = new UserModel({
        Fname,
        Lname,
        username,
        email,
        password,
        profilepic,
      });

      await newUser.save();
      res.status(201).send({Message:'User Registered Successfully',success:true});
    }else{
       res.status(400).send({Message:'User already exits',success:false}); 
    }
  } catch (error) {
    res.status(500).send({Message:error.message,success:false})
  }
}

async function login (req,res){
    try {
        const {username, password}=req.body;
        const user = await UserModel.findOne({username});
        if(user && (await user.comparePassword(password))){
            // const payload ={};
            const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
            res.status(200).send({ message:'User Logged In', User:username, 'token': token , success: true });
        }else{
            return res.status(400).send({message:'Invalid login credentials'})
        }
    } catch (error) {
        res.status(500).send({message: error.message,success: false});
    }
}

module.exports={register,login}
