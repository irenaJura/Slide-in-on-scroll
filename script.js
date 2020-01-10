// we will only run this function at most 20 miliseconds

function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  const sliderImages = document.querySelectorAll('.slide-in');

  function checkSlide() {
      //console.log(e);
      console.log(window.scrollY + window.innerHeight);
      sliderImages.forEach(sliderImage => {
          // window height + scroll pixels minus half of the image = start sliding in
          const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
          // figure out where the bottom of img is
          // offsetTop means how far it is from the window top
          const imageBottom = sliderImage.offsetTop + sliderImage.height; 
          const isHalfShown = slideInAt > sliderImage.offsetTop;
          const isNotScrolledPast = window.scrollY < imageBottom;
          if(isHalfShown && isNotScrolledPast) {
              sliderImage.classList.add('active');
          } else {
              sliderImage.classList.remove('active');
          }
      });
  }

  window.addEventListener('scroll', debounce(checkSlide));