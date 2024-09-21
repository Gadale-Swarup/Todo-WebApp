const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    Fname:{
        type:String,
        required:true
    },
    Lname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique: true,  
    },
    email:{
        type:String,
        required:true,
        unique: true,  
    },
    password:{
        type:String,
        required:true
        
    },  
    profilepic:{
        type:String,
        required:false
    },
    agreeTerms:{
        type:Boolean
    }

});

// userSchema.pre('save',async function(next) {
//     const user=this;
//     const salt = await bcrypt.genSalt(10);
//     if(user.isModified('password')){
//         this.password=await bcrypt.hash(user.password,8);
//     }
//     next();
// })

// userSchema.methods.comparePassword = async function (password) {
//     return await bcrypt.compare(password,this.password);
// }

const User=mongoose.model('user',userSchema);

module.exports=User;