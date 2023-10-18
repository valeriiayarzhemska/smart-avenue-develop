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

function handleScroll() {
  const scroll = $(window).scrollTop();
  const shouldAddNavClasses = scroll > 0;

  $('.nav__content, .nav__link, .nav__item--subtitle, .nav__link--additional')
    .toggleClass('nav__scrolling', shouldAddNavClasses)
    .toggleClass('nav__link--scrolling', shouldAddNavClasses)
    .toggleClass('nav__item--scrolling', shouldAddNavClasses)
    .toggleClass('nav__link--scrolling', shouldAddNavClasses);

  $('.select2-selection__rendered')
    .toggleClass('select2-text--scrolling', shouldAddNavClasses);
}

$(document).ready(function() {
  handleScroll();
});

$(window).scroll(function() {
  handleScroll();
});
