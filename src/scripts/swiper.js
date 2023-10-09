/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const mainSwiper = new Swiper('.main-screen__swiper', {
  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.main-screen__swiper-button-next',
    prevEl: '.main-screen__swiper-button-prev',
  },
});

const advantagesSwiper = new Swiper('.advantages__swiper', {
  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.advantages__swiper-button-next',
    prevEl: '.advantages__swiper-button-prev',
  },
});
