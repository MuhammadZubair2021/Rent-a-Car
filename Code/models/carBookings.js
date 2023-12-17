const   mongoose                =   require('mongoose');

const   carBookingSchema  =   new mongoose.Schema({
   customerId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'users'
      },

   carId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'cars'
      },

   phoneNumber:String,
   bookingDate:String,
   bookingDays:String,
   returningDate:String,

   //Below three var will be used for figuring out returning Date...
   returningDay:String,
   returningMonth:String,
   returningYear:String,
   
   rent:String,

   isPhoneNumberVerified:Boolean,   
   isConfirmed : Boolean,
   isReturned : Boolean,

   referenceNo : String,
   
   carName     : String,
   carImage    : String,
   customerName: String,
   customerEmail:String,

   paidAmounts :  String,

   invoicePath : String,
   invoiceName : String,
   confirmingDate: String,
   confirmingTime : String

},{timestamps:true});

module.exports  =   mongoose.model('carBookings',carBookingSchema);