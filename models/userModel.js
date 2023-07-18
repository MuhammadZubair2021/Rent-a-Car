const   mongoose                =   require('mongoose'),
passportLocalMongoose           =   require('passport-local-mongoose');

const   userSchema  =   new mongoose.Schema({
   firstName:String,
   lastName:String,
   fullName:String,
   //Below userName used to take email as the user name (go to collection then signUp post)   
   username:String,
   
   emailToken:String,
   isVerified : Boolean,
   email:String,
   gender:String,   
   address:String,
   country:String,
   password:String,
   image:String,
   contactNumber:Number,
   profession:String,
   experience:String,
   languages:String,
   
   project1:String,
   Project2:String,
   project3:String,   
});

userSchema.plugin(passportLocalMongoose);
// module.exports  =   mongoose.model('users',userSchema);