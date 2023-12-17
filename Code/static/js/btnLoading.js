//Btn Loading functionality
let inputFields = document.querySelectorAll('.inputField'),
  btn           = document.getElementById('btn'),
  btnText       = document.getElementById('btnText'),
  span1         = document.getElementById('span1'),
  span2         = document.getElementById('span2'),
  span3         = document.getElementById('span3'),
  span1Interval, span2Interval, span3Interval, hideAllSpanInterval;

//First Check that either this page has a btn with id='btn'
if(btn){
btn.addEventListener('click', () => {

  //First check for empty inputFields
  let emptyFlag;
  inputFields.forEach((input, index) => {
    if (input.value.length < 1) {
      emptyFlag = true;
    }
  });
  if (emptyFlag) {
    return false;
  }
  else {
    //If there is no empty input field, then start animating loading spans...
    span1Interval = setTimeout(showSpan1, 200);
    
    // Now recognize the pressed btn text (log in, register, verify etc.)
    if(btnText.textContent == 'LOG IN'){
      btnText.textContent = 'LOGGING IN';
    }
    else if(btnText.textContent == 'Verify'){
      btnText.textContent = 'Verifying Code';
    }    
    else if(btnText.textContent == 'Send Request'){
      btnText.textContent = 'Checking Details';
    }
    
    else if(btnText.textContent == 'GET REGISTER'){
      btnText.textContent = 'Registering You';
    }
    
    else if(btnText.textContent == 'Reset Password'){
      btnText.textContent = 'Verifying details';
    }
    
    else if(btnText.textContent == 'Check Email'){
      btnText.textContent = 'Sending Request';
    }
    
    else if(btnText.textContent == 'Add Feedback'){
      btnText.textContent = 'Adding feedback';
    }
    else{
      btnText.textContent = 'Working On It'
    }      
    btn.style.cursor = 'not-allowed';
    btn.setAttribute('title','Kindly Wait ...')
  }
})
} // End of if(btn){}

function showSpan1() {
  span1.classList.add('px-1');
  clearTimeout(span1Interval);
  span2Interval = setTimeout(showSpan2, 300);
}
function showSpan2() {
  span2.classList.add('px-1');
  clearTimeout(span2Interval);
  span3Interval = setTimeout(showSpan3, 400);
}
function showSpan3() {
  span3.classList.add('px-1');
  clearTimeout(span3Interval);
  setTimeout(hideAllSpan, 500);
}
function hideAllSpan() {
  span1.classList.remove('px-1');
  span2.classList.remove('px-1');
  span3.classList.remove('px-1');
  clearTimeout(hideAllSpanInterval);
  span1Interval = setTimeout(showSpan1, 500);
}
// End of loading functionality 