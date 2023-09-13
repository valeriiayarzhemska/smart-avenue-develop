/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const mainSwiper = new Swiper('.main__swiper', {
  direction: 'horizontal',
  loop: true,

  pagination: {
    el: '.main__swiper-pagination',
    clickable: true,
  },
});

const clientsSwiper = new Swiper('.clients__swiper', {
  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.clients__swiper__button-next',
    prevEl: '.clients__swiper__button-prev',
  },
});
