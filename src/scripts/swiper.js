/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const mainSwiper = new Swiper('.main__swiper', {
  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.main__swiper-button-next',
    prevEl: '.main__swiper-button-prev',
  },
});
