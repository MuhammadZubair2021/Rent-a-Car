// All the modals (formModals) and its styling are present in header.ejs file

        // Show  Form (modal) on clicking a button 
    const               
        underConstructionDiv = document.getElementById('underConstructionDiv'),        
        headerArea = document.getElementsByClassName('header-area');                        

        //Under Construction Div
        document.querySelectorAll('.underConstructionBtn')
          .forEach(btn=>{
            btn.addEventListener('click',()=>{
              underConstructionDiv.classList.remove('hide');
              underConstructionDiv.classList.add('show');           

              headerArea[0].style .display = 'none' ; 
            })
          })

        //Close (div class "modal") on clicking x button . 
        document.querySelectorAll('.closeModal').           
          forEach(closeBtn=>{
            closeBtn.addEventListener('click',()=>{
            headerArea[0].style.display = 'block' ;                 
            
            underConstructionDiv.classList.remove('show');
            underConstructionDiv.classList.add('hide');
          })
        }) 
