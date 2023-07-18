 //CNIC field auto-completion
 document.querySelectorAll('.cnic')
 .forEach(cnicField=>{
   cnicField.addEventListener('keyup', ()=>{
    var cnicValue = cnicField.value ;
    if(cnicValue.length == 5){
      cnicField.value = cnicValue + '-';
    }
    else if(cnicValue.length == 13){
      cnicField.value = cnicValue + '-';
    }
   })
 })    