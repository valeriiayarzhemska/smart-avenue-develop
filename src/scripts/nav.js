const navIconBurger = $('.nav-mobile__icons--burger');
const navIconCross = $('.nav-mobile__icons--cross');
const navLists = $('.nav-mobile__lists');
const navListsActive = {
  transform: 'translateX(-100%)',
  visibility: 'hidden'
};
const headerHeight = $('.nav__content').height();
const headerHeightMobile = $('.nav-mobile__content').height();

function hideNavList() {
  navIconBurger.removeClass('nav-mobile__icons--undisplayed');
  navIconCross.addClass('nav-mobile__icons--undisplayed');
  navLists.css(navListsActive);
  $('body').css('overflow', 'auto');
};
  
function handleScroll() {
  const scroll = $(window).scrollTop();
  const shouldAddNavClasses = scroll > 0;

  $('.nav__content, .nav__link, .nav__item--subtitle, .nav__link--additional')
    .toggleClass('nav__scrolling', shouldAddNavClasses)
    .toggleClass('nav__link--scrolling', shouldAddNavClasses)
    .toggleClass('nav__item--scrolling', shouldAddNavClasses)
    .toggleClass('nav__link--scrolling', shouldAddNavClasses);

  $('.select2-selection__rendered').toggleClass('select2-text--scrolling', shouldAddNavClasses);
}

$(document).ready(function () {
  $('.nav-mobile__icons--burger').on('click', function () {
    navIconBurger.addClass('nav-mobile__icons--undisplayed');
    navIconCross.removeClass('nav-mobile__icons--undisplayed');
    navLists.css({
      transform: 'translateX(0)',
      visibility: 'visible'
    });
    $('body').css('overflow', 'hidden');
  });
  
  $('.nav-mobile__icons--cross').on('click', hideNavList);

  handleScroll();

  $('.nav__link, .button__link, .news__swiper-slide-title-link, .button-transparent__link').on('click', function (event) {
    event.preventDefault();
  
    const targetId = $(this).attr('href');
  
    $('html, body').animate({
      scrollTop: $(targetId).offset().top - headerHeight
    }, 0);
  });

  $('.nav-mobile__link').on('click', function (event) {
    event.preventDefault();
  
    const targetId = $(this).attr('href');
  
    $('html, body').animate({
      scrollTop: $(targetId).offset().top - headerHeightMobile
    }, 0);

    hideNavList();
  });

  $(document).scroll(function () {
    handleScroll();
  });
});