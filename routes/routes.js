const   router       =   require('express').Router(),
        passport     =   require('passport'),
        middlewares  =   require('../Middlewares/middleware'),
        collection   =   require('../collections/collection'),
        admin        =   require('../models/admin'),
        customers    =   require('../models/customers'),
        user         =   require('../models/user');
        
//Uploading and saving image is follow...
const multer = require("multer");
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});
const fileFilter = (req,file , cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null,true);
    }
    else{
        cb(null,false)
    }
};

const upload = multer({
    storage:storage,
    limits:{
    fileSize:1024*1024*5 // Maximum 5 MB.
    },
    fileFilter:fileFilter
});

//Landing page.
router.get('/',collection.landingPage);

//Index page
router.get('/index',collection.indexPage);

//Update user get request...
router.get('/userProfile/:id/updateUser',collection.updateUserGet);
//Update user Post request...
router.post('/userProfile/:id/updateUser',upload.single('image'),collection.updateUserPost);


//listen for /new Idea Page request...
router.get('/addIdea',collection.addIdeaGet);

//listen for /new Idea Post request...
router.post('/addIdea',upload.single('image'),collection.addIdeaPost);

//Check Idea for approval...
router.get('/checkIdea/:id',upload.single('image'),collection.checkIdeaGet);

//Idea approved...
router.post('/ideaApproved/:id',upload.single('image'),collection.ideaApproved);

//Idea rejected ...
router.get('/ideaRejected/:id',collection.ideaRejected);

//Ideas filter
router.post('/ideas/filterIdeas',collection.filterIdeas);
//Show one Idea with Id
router.get('/showOneIdea/:id',collection.showOneIdea);

//Modify Idea with Id Get
router.get('/ideas/:id/modify',middlewares.checkUserIdeaOwnership,collection.modifyIdeaGet);

//Modify Idea with Id Post
router.post('/ideas/:id/modify',middlewares.checkUserIdeaOwnership,upload.single('image'),collection.modifyIdeaPost);

//Delete Idea with Id
router.get('/ideas/:id/delete',middlewares.checkUserIdeaOwnership,collection.deleteIdea);




// Registration get request ...
router.get('/registration',collection.registrationGet);

// Registration Post ...
router.post('/registration',collection.registrationPost);

//Verify Email Get ...
router.get('/verifyEmail',collection.verifyEmail);

//Login Get...
router.get('/user/login',collection.userLogin);

// Logging In User post request.
router.post('/userLogin'            
            ,middlewares.checkLoginCredentials
            ,middlewares.checkAccountVerification
            ,middlewares.serializeUser
            ,passport.authenticate('userLocal',
            {                                                       
                failureRedirect:'/user/login',
                failureFlash:true,
                failureMessage:true,      
            }),(req,res)=>{ 
                      if(req.user.role == 'customer'){
                          res.redirect('/customer/dashboard/2/reservations');
                      }
                      else if(req.user.role == 'dbUser'){
                          if(req.user.disable){
                              req.logout();
                              req.flash('error','Sorry, You are disabled by admin');
                              res.redirect('/index');
                          }
                          else{
                            res.redirect('/adminPanel/2/customers');
                          } 
                      }
                      else{
                        res.redirect('/adminPanel/2/customers');
                      }
            })

// Loggin In Customers post request.
// router.post('/customerLogin'
//             ,middlewares.serializeCustomer                
//             ,passport.authenticate('customerLocal',
//             {                       
//                 successRedirect:'/customer/dashboard/2/reservations',
//                 failureRedirect:'/customer/login',
//                 failureFlash:true,
//                 failureMessage:true,      
//             }),(req,res)=>{ 
//                 req.login(customers);               
//             })

//Admin Registration ...
router.get('/adminRegistration',collection.adminRegistrationGet);
router.post('/adminRegistration',collection.adminRegistrationPost);

//show Car registration form
router.get('/adminpanel/carRegistration'
            ,middlewares.isAdminLoggedIn
            ,collection.carRegistrationGet);

//Car registration post request
router.post('/adminpanel/carRegistration'
            ,middlewares.isAdminLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority
            ,upload.single('displayImage')
            ,collection.carRegistrationPost);


//Ideas page
router.get('/vehicles',collection.vehicles);

//Showing Single car details 
router.get('/vehicles/carDetails/withId/:id'            
            ,collection.carDetails);
        
// Car comment/feedback get form request
router.get('/vehicles/carDetails/carFeedback/withId/:id'
            ,middlewares.isLoggedIn
            ,collection.carFeedbackGet);

// CAr new feedback/Comment Post request
router.post('/vehicles/carDetails/carFeedback/withId/:id'
            ,middlewares.isLoggedIn
            ,collection.carFeedbackPost);

            
//Modify comment/feedback with (car and feedback) Id Get...
router.get('/vehicles/carDetails/carFeedback/modifyFeedback/withId/:carId/:feedbackId'
            ,middlewares.isLoggedIn
            // ,middlewares.checkUserCommentOwnership
            ,collection.modifyCarFeedbackGet);

//Modify comment/feedback with (car and feedback) Id Post...
router.post('/vehicles/carDetails/carFeedback/modifyFeedback/withId/:carId/:feedbackId'
            ,middlewares.isLoggedIn
            // ,middlewares.checkUserCommentOwnership
            ,collection.modifyCarFeedbackPost);

//Delete comment with Id...
router.get('/vehicles/carDetails/carFeedback/deleteFeedback/withId/:carId/:feedbackId'
            ,middlewares.isLoggedIn
            // ,middlewares.checkUserCommentOwnership
            ,collection.deleteCarFeedback);


// Car Booking form get request
router.get('/vehicles/reserveCar/withIds/:carId'
            ,middlewares.isLoggedIn
            ,middlewares.isCarAvailable
            ,collection.carBookingForm);

// Car Booking Post request
router.post('/vehicles/reserveCar/withIds/:customerId/:carId'
            ,middlewares.isLoggedIn
            ,middlewares.isCarAvailable
            ,collection.carBookingPost);

//verify phoneNumber OTP Get
router.get(`/verifyOTP/:phoneNumber/:carId/:bookingId`
            ,middlewares.isLoggedIn
            ,middlewares.isCarAvailable
            ,collection.verifyOTPGet);         

//Verify phoneNumber OTP Post
router.post(`/verifyOTP/:phoneNumber/:carId/:bookingId`
            ,middlewares.isLoggedIn
            ,middlewares.isCarAvailable
            ,collection.verifyOTPPost);
            
// Send OTP Again with SMS / or make a call
router.get('/sentOTPAgain/:phoneNumber/:carId/:bookingId/:channel'
            ,middlewares.isLoggedIn
            ,middlewares.isCarAvailable
            ,collection.sendOTPAgain);

// Generate Invoice PDF
router.get('/customer/generateInvoicePDF/:reservationId'
            ,middlewares.isLoggedIn
            ,collection.clientGenerateInvoicePDF);       

//Reset Password Get
router.get('/resetPassword/withEmail',collection.resetPasswordGetEmail);

//Reset Password Post (Email sending)
router.post('/resetPassword'
,collection.resetPasswordEmail);

//Verify Reset password token 
router.get('/verifyPasswordToken',collection.verifyPasswordToken);

//Verify Reset password token Post
router.post('/verifyPasswordToken',collection.verifyPasswordTokenPost);

//admin Login page get request
router.get('/index/admin-login',collection.adminLogin);

// Loggin In Admin post request.
// router.post('/adminLogin',middlewares.serializeAdmin
//             ,passport.authenticate('adminLocal',
//             {        
//             successRedirect:'/adminPanel/2/customers',
//             failureRedirect:'/',
//             failureFlash:true,
//             failureMessage:true,      
//             }),(req,res)=>{  
//                 req.login(admin);              
//             })

// Dashboard (customer dashboard)
router.get('/customer/dashboard/:amount/reservations'
            // ,middlewares.isLoggedIn
            // ,middlewares.isCustomer
            ,collection.dashboard);          

//Update Customer with Id...
router.post('/updateCustomer/withId/:id'
            ,middlewares.isLoggedIn
            ,collection.updateCustomer
            )
            
//Change Customer Password
router.post('/customer/changePassword/withId/:id'
            ,middlewares.isLoggedIn            
            ,collection.changeCustomerPassword);            

//Admin Panel 
router.get('/adminPanel/:amount/:flag'
            ,middlewares.isLoggedIn            
            ,middlewares.isAdminOrDbUser
            ,collection.adminPanel);

//Update Admin Profile details 
router.post('/updateAdminProfile/:id'
            ,middlewares.isLoggedIn
            ,middlewares.isAdminOrDbUser
            ,collection.updateAdminProfile);

//Update Shop/Bargain details
router.post('/adminPanel/updateShopDetails/withId/:id'
            ,middlewares.isLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority
            ,collection.updateShopDetails);

//Add internal images to car with Id
router.post('/adminPanel/addInternalImages/toCar/withId/:id'
            ,middlewares.isLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority            
            ,upload.array('internalImages',4),
            collection.addInternalImagesToCar);

//Update Car with Id 
router.post('/adminPanel/updateCar/withId/:id'
            ,middlewares.isAdminLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority
            ,upload.single('displayImage')
            ,collection.updateCar)

// Update car internal images 
router.post('/adminPanel/update/carInternalImages/withId/:id'
            ,middlewares.isAdminLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority
            ,upload.array('internalImages',4)
            ,collection.updateCarInternalImages);
            
//Hide Car
router.get('/adminPanel/carDetails/hideCar/withId/:id'
            ,middlewares.isAdminLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority            
            ,collection.hideCar);            

//Show Car
router.get('/adminPanel/carDetails/showCar/withId/:id'
            ,middlewares.isAdminLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority            
            ,collection.showCar);

//Delete Car             
router.get('/adminPanel/deleteCar/withId/:id'
            ,middlewares.isAdminLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority            
            ,collection.deleteCar)
            
//Confirming a customer reservation
router.post('/adminPanel/confirm/a/reservation/:reservationId'
            ,middlewares.isAdminLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority            
            ,collection.confirmAReservation)
            
// Update reservatoin details (Not Correct customer reservation)        
router.post('/adminPanel/update/notCorrect/reservation/details/:reservationId'
            ,middlewares.isAdminLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority            
            ,collection.updateANotCorrectReservation);

//Delete a customer with id 
router.get('/adminPanel/deleteCustomer/withId/:id'
            ,middlewares.isLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority
            ,collection.deleteCustomer);
            
//Change Admin Password
router.post('/adminPanel/changeAdminOrDbUserPassword/withId/:id'
            ,middlewares.isLoggedIn
            ,middlewares.isAdminOrDbUser
            ,collection.changeAdminOrDbUserPassword);
            
//Shop Registration Get
router.get('/adminPanel/shopRegistration'
            ,middlewares.isLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority
            ,collection.shopRegistrationGet)
            
//Shop Registration Post
router.post('/adminPanel/shopRegistration'
            ,middlewares.isLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority
            ,collection.shopRegistrationPost)
            
//Registering database User ...
// router.get('/adminPanel/dbUserRegistration',collection.dbUserRegistrationGet)
            
//Registrating database User Post ...
router.post('/adminPanel/dbUserRegistration'
            ,middlewares.isLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority
            ,collection.dbUserRegistrationPost);
            
//Modify dbUser by id
router.post('/adminPanel/modifyDbUser/WithId/:id'
            ,middlewares.isLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority
            ,collection.modifyDbUser);

//Delete dbUser by id
router.get('/deleteDbUser/:id'
            ,middlewares.isLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority
            ,collection.deleteDbUser);

// Disable dbUser
router.get('/disableDbUser/:id'
            ,middlewares.isLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority
            ,collection.disableDbUser);

// Enable dbUser
router.get('/enableDbUser/:id'
            ,middlewares.isLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority
            ,collection.enableDbUser);

//Issued Cars Get
router.get('/issuedCars'
            ,middlewares.isLoggedIn
            ,middlewares.isAdminOrDbUser
            ,collection.issuedCars);

// Update returned car reseravation details and make Car available           
router.post('/adminPanel/update/notCorrect/Returned/car/details/:carId/:reservationId'
            ,middlewares.isAdminLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority
            ,collection.updateReturnedCarReservationDetails);

//Make/Mark a returned car as available for others
router.get('/vehicles/makeAvailable/withId/:carId/:reservationId'
            ,middlewares.isAdminLoggedIn
            ,middlewares.isAdminOrDbUserWithFullAuthority
            ,collection.makeAvailable);

//Contact-us form submission ...
router.post("/contact-us", collection.contactUs);  
    

//Logout functionality...
router.get('/logout',(req,res)=>{
    req.logout();
    req.flash(`success`,`Logged You Out`);
    res.redirect('/index');
})

//For testing purpose
router.get('/test',(req,res)=>{
    res.render('testingBookingForm.ejs',{sentTitle:'To Test'});
})

//Listen for page not found request
router.use(collection.pageNotFound);

module.exports=router;