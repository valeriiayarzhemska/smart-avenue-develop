$(window).scroll(function() {
  const scroll = $(window).scrollTop();
  const shouldAddNavClasses = scroll > 0;

  $('.nav__content, .nav__link, .nav__item--subtitle, .nav__link--additional')
    .toggleClass('nav__scrolling', shouldAddNavClasses)
    .toggleClass('nav__link--scrolling', shouldAddNavClasses)
    .toggleClass('nav__item--scrolling', shouldAddNavClasses)
    .toggleClass('nav__link--scrolling', shouldAddNavClasses);

  $('.select2-selection__rendered')
    .toggleClass('select2-text--scrolling', shouldAddNavClasses);
});
