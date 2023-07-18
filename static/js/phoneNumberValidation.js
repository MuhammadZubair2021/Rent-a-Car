      var
      formSubmitBtn = document.querySelectorAll('.form-submit'),
      errorMsg = document.querySelectorAll(".phoneNumberError"), // Phone Number err-msg      
      phoneInputField = [] ,
      phoneNumber = [];        
       
      // on Keyup: validate phoneNumber
      phoneInputField = document.querySelectorAll('.phoneNumber')
      .forEach((inputField,index)=>{
        inputField.addEventListener('keyup', function() {
          phoneNumber = inputField.value ; 
          if(phoneNumber == ''){
            inputField.style.border = "1px dotted red" ;      
            errorMsg[index].innerHTML = 'Please Provide a valid Number';
            errorMsg[index].style.color='red';
            inputField.focus();
            formSubmitBtn[index].disabled = true; // Disable submit_from btn
            formSubmitBtn[index].style.cursor = 'not-allowed';
            return false ;
          }                                
          else if(!phoneNumber.match(/^[0-9+]+$/)){
            inputField.style.border = "1px dotted red" ;      
            errorMsg[index].innerHTML = 'Enter Numbers, Only !';
            errorMsg[index].style.color='red';
            inputField.focus();
            formSubmitBtn[index].disabled = true; // Disable submit_from btn
            formSubmitBtn[index].style.cursor = 'not-allowed';
            return false ;         
          }
          else if(phoneNumber.length <= 10){
            inputField.style.border = "1px dotted red" ;      
            errorMsg[index].innerHTML = 'Too short !';
            errorMsg[index].style.color='red';
            inputField.focus();
            formSubmitBtn[index].disabled = true; // Disable submit_from btn
            formSubmitBtn[index].style.cursor = 'not-allowed';
            return false ;
          }
          else if(phoneNumber.length >= 14){
            inputField.style.border = "1px dotted red" ;      
            errorMsg[index].innerHTML = 'Too Long !';
            errorMsg[index].style.color='red';
            inputField.focus();
            formSubmitBtn[index].disabled = true; // Disable submit_form btn
            formSubmitBtn[index].style.cursor = 'not-allowed';
            return false ;
          }
          else{                       
            inputField.style.border = "1px solid black" ;          
            errorMsg[index].innerHTML = 'Nice, Please Proceed farward';
            errorMsg[index].style.color='gray';
            formSubmitBtn[index].disabled = false; // Disable submit_from btn
            formSubmitBtn[index].style.cursor = 'pointer';
            return true ;  
          }
        });
        inputField.addEventListener('blur',()=>{
          phoneNumber = inputField.value ;
          if(phoneNumber.charAt(0)== 0){
            if(phoneNumber.length <=10){
              inputField.style.border = "1px dotted red" ;      
              errorMsg[index].innerHTML = 'Too short !';
              errorMsg[index].style.color='red';
              inputField.focus();
              formSubmitBtn[index].disabled = true; // Disable submit_from btn
              formSubmitBtn[index].style.cursor = 'not-allowed';
              return false ;
            }
            else if(phoneNumber.length >= 12){
                inputField.style.border = "1px dotted red" ;      
                errorMsg[index].innerHTML = 'Too Long!';
                errorMsg[index].style.color='red';
                inputField.focus();
                formSubmitBtn[index].disabled = true; // Disable submit_from btn
                formSubmitBtn[index].style.cursor = 'not-allowed';
                return false ;
            }
            else{
              var newPhoneNumber = phoneNumber.slice(1,11);  //slice(start,end) -> substr ;
              inputField.value = '+92' + newPhoneNumber ;
              return true ;
            }
          }
          else if(phoneNumber.slice(0,3)=='+92'){
            if(phoneNumber.length <=12){
              inputField.style.border = "1px dotted red" ;      
              errorMsg[index].innerHTML = 'Too short !';
              errorMsg[index].style.color='red';
              inputField.focus();
              formSubmitBtn[index].disabled = true; // Disable submit_from btn
              formSubmitBtn[index].style.cursor = 'not-allowed';
              return false ;
            }
            else if(phoneNumber.length >= 14){
                inputField.style.border = "1px dotted red" ;      
                errorMsg[index].innerHTML = 'Too Long!';
                errorMsg[index].style.color='red';
                inputField.focus();
                formSubmitBtn[index].disabled = true; // Disable submit_from btn
                formSubmitBtn[index].style.cursor = 'not-allowed';
                return false ;
            }
            else{              
              inputField.value = phoneNumber ;
              return true ;
            }
          }          
        })
      })     
