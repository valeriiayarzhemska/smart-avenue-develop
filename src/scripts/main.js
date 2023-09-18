'use strict';

const navIconBurger = document.querySelector('.nav-mobile__icons--burger');
const navIconCross = document.querySelector('.nav-mobile__icons--cross');

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#nav') {
    navIconBurger.classList.add('nav-mobile__icons--undisplayed');
    navIconCross.classList.remove('nav-mobile__icons--undisplayed');

    document.body.style.overflow = 'hidden';
  } else {
    navIconBurger.classList.remove('nav-mobile__icons--undisplayed');
    navIconCross.classList.add('nav-mobile__icons--undisplayed');

    document.body.style.overflow = 'auto';
  }
});
