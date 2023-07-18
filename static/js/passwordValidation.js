
  function togglePassVisibility() {
  
    var x = document.querySelectorAll(".password"),
        y = document.querySelectorAll('.repeatPassword'),
        toggleBtn = document.querySelectorAll('.toggleBtn');

    x.forEach((x , index)=>{
      if (x.type === "password") {
        x.type = "text";
        toggleBtn[index].textContent = 'Hide' ;
      } else {
        x.type = "password";
        toggleBtn[index].textContent = 'Show' ; 
      }

      if(y[index]){
        if (y[index].type === "password") {          
          y[index].type = "text"; 
          toggleBtn[index].textContent = 'Hide' ;
        } 
        else {          
          y[index].type = "password";      
          toggleBtn[index].textContent = 'Show' ;  
        }
      }    
    })        
  }  

      var passwordsList = document.querySelectorAll('.password');

      document.querySelectorAll('.repeatPassword')
      .forEach((repeatPasswordField,index)=>{
        repeatPasswordField.addEventListener('keyup',()=>{  
          
          password = passwordsList[index].value ;
          repeatPassword = repeatPasswordField.value;

          if(password === repeatPassword){            
            removePasswordError();
            enableFormBtn();
            return true ;   
          }
          else{
              setPasswordError(" Password did not matched " ) ;
              disableFormBtn();   
              repeatPasswordField.focus();
              return false ;
          }
        })     
      })
     
      function disableFormBtn(){
        document.querySelectorAll('.form-submit')
        .forEach(btn=>{
          btn.disabled=true ;
          btn.style.cursor='not-allowed';
        })
      }

      function enableFormBtn(){
        document.querySelectorAll('.form-submit')
        .forEach(btn=>{
          btn.disabled = false ;
          btn.style.cursor='pointer';
        })
      }

      function setPasswordError(message){
        document.querySelectorAll('.repeatPasswordError')
        .forEach(spanTag=>{
          spanTag.textContent = message;
          spanTag.style.color = 'red';
        })
      }

      function removePasswordError(){
        document.querySelectorAll('.repeatPasswordError')
        .forEach(spanTag=>{
          spanTag.textContent = 'Matched !';
          spanTag.style.color = 'gray';
        })
      }