const   
        ideasSchema     =   require('../models/ideasModel'),
        carFeedbacks  =   require('../models/carFeedbacks'),
        user           =   require('../models/user'),        
        cars            =   require('../models/car'),
        dbUsers         =   require('../models/dbUser'),        
        passport        =   require('passport'),
        localStrategy   = require('passport-local');


//MiddleWare function for checking user is logged in or not.
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash('error','Kindly, Log In to Continue');
        res.redirect('/user/login');
        return false ;
    }
    
}

//Is Customer is to check weather the user is customer that tring to access dashboard
function isCustomer(req,res,next){
    if(req.user.role == 'customer'){
        return next();        
    }
    else{
        req.flash('success','Your profile detials are here');
        res.redirect('adminPanel/2/customers');
        return ;
    }
}

//MiddleWare function for checking Admin is logged in or not.
function isAdminLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash('error','Kindly, Log In to Continue');
        res.redirect('/user/login');
        return false ;
    }    
}


//Check user Registration for Reseting Password...
const isEmailRegistered = (req,res,next)=>{    
    let  usersEmailArray = [];
     
     user.find({role : 'customer'})
     .then(users =>{        
         users.forEach(user=>
             {                
                usersEmailArray.push(user.email)
             }) 
                     
              if((usersEmailArray.indexOf(req.body.email))== -1){
                 req.flash('error',`Provided email don't exists`);
                 return res.redirect('/user/login');
 
              }            
             else{               
                 return next();
             }        
     })
         .catch(error=>{
             console.log(error);
             req.flash('error','Error at finding customers, try again');
             return res.redirect('/user/login');                       
     }) 
 }

//Check Car availability
function isCarAvailable(req,res,next){
    let carId = req.params.carId ;
    cars.findById(carId)
    .then(foundCar=>{
        if(foundCar.status == 'Available'){
            console.log('Car Availability checked, Status: Available');
            return next();           
        }
        else{
            req.flash('error','Sorry! Already Reserved');
            res.redirect('/vehicles');
            return false ;
        }
    })
    .catch(error=>{
        req.flash('error','Car Not Found, try again');
        res.redirect('/vehicles');
        return false ;
    })
}

//Check that current user is admin / dbUser
async function isAdminOrDbUser(req,res,next){
    if(req.user.role == 'admin'){
        return next();
    }
    else if(req.user.role == 'dbUser'){        
            return next();        
    }
    else{
        req.flash(`error`,`You are not allowed to do so.`)
        res.redirect('/vehicles');
        return false;
    }
}

//Check that current user is admin / dbUser with read and Write role
async function isAdminOrDbUserWithFullAuthority(req,res,next){
        if(req.user.role == 'admin'){
            return next();
        }
        else if(req.user.role == 'dbUser'){
            if(req.user.authority == 'readAndWrite'){
                return next();
            }
            else{
                req.flash(`error`,`You are not allowed to do so.`)
                res.redirect('/vehicles');
                return false;
            }
        }
        else{
            req.flash(`error`,`You are not allowed to do so.`)
            res.redirect('/vehicles');
            return false;
        }
}


//MiddleWare function for checking user is authorized to edit or delete campground?
function checkUserIdeaOwnership(req,res,next){
    const ideaId = req.params.id;
    if(req.isAuthenticated()){
        ideasSchema.findById(ideaId)
        .then((foundIdea)=>{
            if(foundIdea.author.id.equals(req.user.id)){                
                next();
            }
            else {                            
                res.redirect('/showOneIdea/'+ideaId);
            }
        })
    }
    else{
        console.log('you need to be logged in');
        req.flash('error','Please login first');       
        res.redirect('/signIn');
    }
}


//MiddleWare function for checking user is authorized to edit or delete comment?
function checkUserCommentOwnership(req,res,next){
    if(req.isAuthenticated()){
        commentsSchema.findById(req.params.commentId)
        .then((foundComment)=>{
            if(foundComment.author.id.equals(req.user.id)){                
                next();
            }
            else {
                console.log('You are not authorized to do this');
                req.flash('error','You are not authorized to do this');               
                res.redirect('..');
            }
        })
    }
    else{
        console.log('you need to be logged in');
        req.flash('error','Please login first');   
        res.redirect('signIn');
    }
}

//Check user Login credentials (input data)...
const checkLoginCredentials = (req,res,next)=>{    
   let  customerEmailArray = [];
    
    user.find()
    .then(customers =>{        
        customers.forEach(oneCustomer=>
            {                
                customerEmailArray.push(oneCustomer.email)
            }) 
                    
             if((customerEmailArray.indexOf(req.body.username))== -1){
                req.flash('error',`Email not registered`);
                return res.redirect('/user/login');
             }            
            else{               
                return next();
            }        
    })
        .catch(error=>{
            console.log(error);
            req.flash('error','Invalid Credentials, Please try again.');
            return res.redirect('/user/login');                       
    }) 
}

//Check for user account verification...
const checkAccountVerification = (req,res,next)=>{
    user.find({username:req.body.username})
    .then(foundUser=>{
        //As admin and dbUsers don't need to verify their accounts so 
        if(foundUser[0].role == 'admin'){
            return next();
        }
        else if(foundUser[0].role == 'dbUser'){
            return next();
        }
        else if(foundUser[0].isVerified){
           return next();
        }
        else{
            req.flash('error','Account not verified, Kindly verify your account by clicking on the link sent to '+ foundUser[0].email);
            res.redirect('/user/login');
        }
    })
    .catch(error=>{
        req.flash('error','Something went wrong, please try again') ;
        res.redirect('/user/login');
    })
}

//Serialize User with Passport
const serializeUser = async (req,res,next)=>{
    
    passport.serializeUser(user.serializeUser());
    passport.deserializeUser(user.deserializeUser());

    return next();
}

//Serialize Customer with Passport
// const serializeCustomer = async (req,res,next)=>{
    
//     passport.serializeUser(customers.serializeUser());
//     passport.deserializeUser(customers.deserializeUser());

//     return next();
// }


//Serialize Admin with Passport
// const serializeAdmin = async (req,res,next)=>{
//     passport.use('adminLocal', new localStrategy(admin.authenticate()));
//     passport.use('customerLocal', new localStrategy(customers.authenticate()));

//     passport.serializeUser(admin.serializeUser());
//     passport.deserializeUser(admin.deserializeUser());

//     passport.serializeUser(customers.serializeUser());
//     passport.deserializeUser(customers.deserializeUser());
//     return next();
// }

//finally export all the middleware functions
module.exports = {
    isLoggedIn,
    isCustomer,

    isAdminLoggedIn,
    isCarAvailable,
    isEmailRegistered,

    isAdminOrDbUser,
    isAdminOrDbUserWithFullAuthority,

    checkLoginCredentials,
    checkAccountVerification,
    checkUserIdeaOwnership,
    checkUserCommentOwnership,
    
    serializeUser,
}