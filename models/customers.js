const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const customerShcema = new mongoose.Schema({
   cnic:String,
   fullName:String,
   email:String,
   emailToken:String,
   isVerified:Boolean,
   
   //Below username will be used to take email as the user name for signIn purpose (Go to collection -> registrationPost)
   username:String,   
   gender:String,
   password:String,
   phoneNumber:String,
   passwordResetToken:String,

   myBookings:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'carBookings',
   }]
})

customerShcema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Customers',customerShcema);