const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({ 

   fullName:String,
   displayImage:String,  
   internalImages:{
      type:Array,
   },

   model:String,
   drivingMode:String,
   rentPerDay:Number,
   airCondition:String,
   engineCapacity:String,    
   seatCapacity:String,
   colour:String,
   details:String,

    //One Idea can have multiple comments / feedback
    feedbacks:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'carFeedbacks',
  }],
   status:String,

   hide : Boolean,

})

module.exports = mongoose.model('cars',carSchema);