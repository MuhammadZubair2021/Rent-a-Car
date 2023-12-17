const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const shopSchema = new mongoose.Schema({   
   fullName:String,
   ownerDetails:{
      id:{
         type:mongoose.Schema.Types.ObjectId,          
      },      
   },
   address:String,
   email:String,    
   phoneNumber:String,
})

shopSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('shops',shopSchema);