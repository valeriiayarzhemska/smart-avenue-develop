'use strict';

function addTextProgressBar(indexSlide) {
  const innerDiv = document.querySelector('#swiper-mobile-slide-progress .inner');
  innerDiv.innerText = `${indexSlide}/4`;
}

function startAnimation(progressBar) {
  progressBar.set(0);
  progressBar.animate(1);
}

function stopAnimation(progressBar) {
  progressBar.set(0);
}

const progressBarType = {
  mobile: 'mobile',
};
let progressBarArray = [];
let progressBarMobile;

function createProgressCircle(progressId, type) {
  var progressBar = new ProgressBar.Circle(progressId, {
    color: '#F03E3E',
    strokeWidth: 5,
    duration: 5000,
    easing: 'easeInOut',
    trailColor: '#E6E6E6',
    trailWidth: 5,
  });

  if (type === progressBarType.mobile) {
    progressBarMobile = progressBar;
  } else {
    progressBarArray.push(progressBar);
  }
}

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
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  on: {
    slideChange: function () {
      const slideIndex = this.realIndex;
      const slideNextIndex = slideIndex !== 0 ? slideIndex - 1 : slideIndex + 1;

      startAnimation(progressBarArray[slideIndex]);
      stopAnimation(progressBarArray[slideNextIndex]);
    },
  },

  pagination: {
    el: '.advantages__swiper-pagination',
  },

  navigation: {
    nextEl: '.advantages__swiper-button-next',
    prevEl: '.advantages__swiper-button-prev',
  },
});

const advantagesSwiperMobile = new Swiper('.advantages__swiper-mobile', {
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  on: {
    slideChange: function () {
      addTextProgressBar(this.realIndex + 1);
      stopAnimation(progressBarMobile);
      startAnimation(progressBarMobile);
    },
  },

  pagination: {
    el: '.advantages__swiper-pagination',
  },

  navigation: {
    nextEl: '.advantages__swiper-button-next',
    prevEl: '.advantages__swiper-button-prev',
  },
});

const newsSwiper = new Swiper('.news__swiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  breakpoints: {
    666: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

const informationSwiper = new Swiper('.information__swiper', {
  direction: 'horizontal',
  loop: true,

  pagination: {
    el: '.information__swiper-pagination',
  },

  navigation: {
    nextEl: '.information__swiper-button-next',
    prevEl: '.information__swiper-button-prev',
  },
});

const gallerySwiper = new Swiper('.gallery__swiper', {
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 20,

  pagination: {
    el: '.gallery__swiper-pagination',
  },

  navigation: {
    nextEl: '.gallery__swiper-button-next',
    prevEl: '.gallery__swiper-button-prev',
  },
});

window.onload = function () {
  createProgressCircle('#swiper-slide-progress1');
  startAnimation(progressBarArray[0]);

  createProgressCircle('#swiper-slide-progress2');
  createProgressCircle('#swiper-slide-progress3');
  createProgressCircle('#swiper-slide-progress4');

  createProgressCircle('#swiper-mobile-slide-progress', progressBarType.mobile);
  startAnimation(progressBarMobile);
};
