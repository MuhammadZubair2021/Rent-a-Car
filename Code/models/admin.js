const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = new mongoose.Schema({
   cnic:String,
   fullName:String,
   email:String,
  
   //Below username will be used to take email as the user name for signIn purpose (Go to collection -> registrationPost)
   username:String,   
   
   password:String,
   phoneNumber:String,
   passwordResetToken:String,
   role:String,
})

adminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('admin',adminSchema);