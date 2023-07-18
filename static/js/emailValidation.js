      
//Email Validation     
function isValidEmail(email) {
  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!email && typeof email === 'string'
    && email.match(emailRegex)
  };

var 
emailError = document.querySelectorAll('.emailError'),
formSubmitBtn = document.querySelectorAll('.form-submit'),

emailField = document.querySelectorAll('.email')
.forEach(function(email,i) {                
  email.addEventListener('keyup',()=>{                           
    const emailValue = email.value ;
                    
    if(emailValue == ''){                
      emailError[i].textContent="Kindly Provide an email address";
      emailError[i].style.color="red";
      formSubmitBtn[i].disabled = true; // Disable submit_from btn
      formSubmitBtn[i].style.cursor = 'not-allowed';
      return false ;
    }
    else if(isValidEmail(emailValue)==null){
      emailError[i].textContent = 'Please Provide a Valid Email Address';
      emailError[i].style.color = 'red' ;
      formSubmitBtn[i].disabled = true;
      formSubmitBtn[i].style.cursor = 'not-allowed';
      emailError[i].focus();
      return false ;
    }
    else{
      emailError[i].textContent= 'Nice, kindly proceed farward ...';
      emailError[i].style.color = 'gray';
      formSubmitBtn[i].disabled = false;   // enable submit_from btn
      formSubmitBtn[i].style.cursor = 'pointer';      
    }                 
  })               
});