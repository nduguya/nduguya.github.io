let navbar = document.querySelector('.header .navbar');
let searchForm = document.querySelector('.header .search-form');
let loginForm = document.querySelector('.header .login-form');
let contactInfo = document.querySelector('.contact-info');


document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    contactInfo.classList.remove('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
};


document.querySelector('#info-btn').onclick = () =>{
    contactInfo.classList.add('active');
   
}


document.querySelector('#close-contact-info').onclick = () =>{
    contactInfo.classList.remove('active');
}


window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
}



//slider part


var swiper = new Swiper(".home-slider", {
    loop:true,
    grabCursor:true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });


var swiper = new Swiper(".reviews-slider", {
    loop:true,
    grabCursor:true,
    spaceBetween: 20,
    breakpoints: {
        640: {
          slidesPerView: 1,
          
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
      },
   
  });




  
//openig the faqs 

const faqs= document.querySelectorAll('.faq');

faqs.forEach(faq => {
    faq.addEventListener('click', ()=>{
        faq.classList.toggle('open');
        //change the plus icon
        const icon = faq.querySelector('.faq__icon i');
        if(icon.className=== 'uil uil-plus'){
            icon.className = "uil uil-minus"
        }else{
            icon.className = "uil uil-plus";
        }
    })
})


/*

// set index and transition delay
let index = 0;
let transitionDelay = 2000;

// get div containing the slides
let slideContainer = document.querySelector(".automated");
// get the slides
let slides = slideContainer.querySelectorAll(".slide");

// set transition delay for slides
for (let slide of slides) {
  slide.style.transition = `all ${transitionDelay/1000}s linear`;
}

// show the first slide
showSlide(index);

// show a specific slide
function showSlide(slideNumber) {
  slides.forEach((slide, i) => {
    slide.style.display = i == slideNumber ? "block" : "none";
  });
  // next index
  index++;
  // go back to 0 if at the end of slides
  if (index >= slides.length) {
    index = 0;
  }
}

// transition to next slide every x seconds
setInterval (() => showSlide(index), transitionDelay);
*/