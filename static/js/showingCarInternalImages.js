let
    carSmallImages    = document.querySelectorAll('.carSmallImage'),
    carLargeImage     = document.querySelector('#carLargeImage');

carSmallImages.forEach(image => {
  image.addEventListener('click',()=>{    
    if(carLargeImage){
      let
          carLargeImageSrc = carLargeImage.getAttribute('src'),
          carSmallImageSrc = image.getAttribute('src');       
      carLargeImage.setAttribute('src',carSmallImageSrc);
      image.setAttribute('src',carLargeImageSrc);
    }
  })
});

//For Dashboard and Admin Panel
function swapWithLargeImage(index,imageIndex){  
  let largeImage = document.querySelectorAll(`.carLargeImage${index}`),
      smallImage = document.querySelectorAll(`.carSmallImage${index}${imageIndex}`),     
     
          carLargeImageSrc = largeImage[0].getAttribute('src'),
          carSmallImageSrc = smallImage[0].getAttribute('src');

          largeImage[0].setAttribute('src',carSmallImageSrc);
          smallImage[0].setAttribute('src',carLargeImageSrc);
}

//enLarge carLargeImage when click on largeImage
function enLargeThisImage(element){
  let
      header          = document.querySelectorAll('.header-area'),
      clickedImgSrc   = element.src,
      modalImg        = document.getElementById('largeImageModalImage'),
      largeImageModal = document.getElementById('largeImageModal');

  //first hide header        
  header[0].style.display = 'none';
  
  //Now show imageModal
  largeImageModal.classList.remove('hide');
  largeImageModal.classList.add('show');

  modalImg.setAttribute('src',clickedImgSrc);
}

function closeLargeImageModal(){
  header          = document.querySelectorAll('.header-area'),
  modalImg        = document.getElementById('largeImageModalImage'),
  largeImageModal = document.getElementById('largeImageModal');

  //first hide ImageModal
  largeImageModal.classList.remove('show');
  largeImageModal.classList.add('hide');      

  modalImg.setAttribute('src','');

  //Now show Header
  header[0].style.display = 'block';
}