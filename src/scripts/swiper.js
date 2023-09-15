/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const mainSwiper = new Swiper('.main-page__swiper', {
  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.main-page__swiper-button-next',
    prevEl: '.main-page__swiper-button-prev',
  },
});
