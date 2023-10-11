/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

function addTextProgressBar(indexSlide) {
  const innerDiv = document.querySelector('#swiper-mobile-slide-progress .inner');
  innerDiv.innerText = `${indexSlide}/4`;
}

function startAnimation(progressBar) {
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

window.onload = function () {
  createProgressCircle('#swiper-slide-progress1');
  startAnimation(progressBarArray[0]);

  createProgressCircle('#swiper-slide-progress2');
  createProgressCircle('#swiper-slide-progress3');
  createProgressCircle('#swiper-slide-progress4');

  createProgressCircle('#swiper-mobile-slide-progress', progressBarType.mobile);
  startAnimation(progressBarMobile);
};

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
    slideNextTransitionEnd: function () {
      const slideIndex = this.realIndex;
      const slideNextIndex = slideIndex !== 0 ? slideIndex - 1 : slideIndex + 1;

      startAnimation(progressBarArray[slideIndex]);
      stopAnimation(progressBarArray[slideNextIndex]);
      addTextProgressBar(slideIndex + 1);
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
    },
    slideNextTransitionEnd: function () {
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
