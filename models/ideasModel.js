const   mongoose                =   require('mongoose');

const   ideasSchema  =   new mongoose.Schema({
   author:{
      id:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'users',
      },
      fullName:String
  },
   image:
   {
      type:String,      
   },
   title:String,
   discription:String,
   category:String,
   numOfDevelopers:Number,
   approved:Boolean,
   //One Idea can have multiple comments
   comments:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'comments'
  }]    
   
});

module.exports  =   mongoose.model('ideas',ideasSchema);