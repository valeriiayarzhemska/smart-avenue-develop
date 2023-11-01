'use strict';

function countSlides(slideIndex, totalSlides) {
  const counterElement = document.querySelector('.planning__popup-slides-counter span');
  if (counterElement) {
    counterElement.textContent = `Зображення ${slideIndex} / ${totalSlides}`;
  }
}

const planningSwiperSettings = {
  slidesPerView: 1,
  spaceBetween: 40,
  breakpoints: {
    666: {
      slidesPerView: 1.8,
    },
    800: {
      slidesPerView: 2.75,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },

  pagination: {
    el: '.planning__swiper-pagination',
  },

  navigation: {
    nextEl: '.planning__swiper-button-next',
    prevEl: '.planning__swiper-button-prev',
  },
};
let planningSwiper = new Swiper('.planning__swiper', planningSwiperSettings);

const planningPopupSwiper = new Swiper('.planning__popup-swiper', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  on: {
    slideChange: function () {
      const totalSlides = this.slides.length;
      const slideIndex = this.realIndex + 1;
      countSlides(slideIndex, totalSlides);
    },
  },

  pagination: {
    el: '.planning__popup-swiper-pagination',
  },

  navigation: {
    nextEl: '.planning__popup-swiper-button-next',
    prevEl: '.planning__popup-swiper-button-prev',
  },
});

const apartments = {
  number: [1, 2, 3, 4, 5],
  section: [1, 2, 3],
  type: 'S (Smart)',
  square: [22, 27, 28, 31],
  price: [389000, 440000, 559000, 790000],
  images: {
    plan22: 'src/images/plan22.png',
    plan27: 'src/images/plan27.png',
    plan28: 'src/images/plan28.png',
    plan31: 'src/images/plan31.png',
  },
};

const apartmentsList = [];

function getRandomFromArray(array) {
  const randomIndex = Math.floor(Math.random() * array.length);

  return randomIndex;
}

function filterApartmentsList(apartments) {
  const newApartmentsList = apartments;

  const activeBuildingNumbers = [];
  const activeSectionNumbers = [];

  $('.planning__filter-button-building--active').each(function () {
    activeBuildingNumbers.push($(this).text());
  });

  $('.planning__filter-button-section--active').each(function () {
    activeSectionNumbers.push($(this).text());
  });

  const filteredApartmentsList = newApartmentsList.filter((apartment) => {
    if (
      (activeBuildingNumbers.length === 0 ||
        activeBuildingNumbers.includes(apartment.number.toString())) &&
      (activeSectionNumbers.length === 0 ||
        activeSectionNumbers.includes(apartment.section.toString()))
    ) {
      return true;
    }
    return false;
  });

  console.log(filteredApartmentsList);
  addApartmentsList(filteredApartmentsList);
}

function createApartmentsList() {
  for (let i = 1; i <= 15; i++) {
    const squarePriceImageIndex = getRandomFromArray(apartments.square);
    const newApartment = {
      name: null,
      number: getRandomFromArray(apartments.number),
      section: getRandomFromArray(apartments.section),
      type: apartments.type,
      square: apartments.square[squarePriceImageIndex],
      price: apartments.price[squarePriceImageIndex],
      image:
        apartments.images[`plan${apartments.square[squarePriceImageIndex]}`],
    };

    newApartment.name = `${newApartment.number}C${newApartment.square}K`;
    apartmentsList.push(newApartment);
  }
}

function addApartmentsList(apartments) {
  const $swiperWrapper = $('.planning__swiper-wrapper');
  $swiperWrapper.empty();
  planningSwiper.destroy();

  if (apartments.length > 0) {
    apartments.forEach((apartment) => {
      const slide = $(`
        <div class='swiper-slide planning__swiper-slide'>
          <div class='planning__swiper-slide-image-container'>
            <img src='${apartment.image}' alt='building'>
          </div>
          <div class='planning__swiper-slide-title'>
            <h4>${apartment.number}C${apartment.square}K</h4>
          </div>
      `);

      const listContainer = $(`
        <div class='planning__swiper-slide-list-container'>
          <ul class='planning__swiper-slide-list'>
          </ul>
        </div>
      `);

      const items = [
        {
          type: 'text',
          iconSrc: 'src/images/icons/home-icon.svg',
          iconAlt: 'building',
          title: 'Тип квартири',
          description: apartment.type,
        },
        {
          type: 'text',
          iconSrc: 'src/images/icons/square-icon.svg',
          iconAlt: 'building',
          title: 'Заг. площа',
          description: `${apartment.square} м.кв`,
        },
        {
          type: 'link',
          iconSrc: 'src/images/icons/plan-icon.svg',
          iconAlt: 'building',
          title: 'План поверху',
          description: 'Відкрити',
        },
      ];

      items.forEach((item) => {
        const isLink = item.type === 'link';

        listContainer.find('.planning__swiper-slide-list').append($(`
          <li class='planning__swiper-slide-item'>
            <div class='planning__swiper-slide-item-title-container'>
              <div class='planning__swiper-slide-item-icon-container'>
                <img src='${item.iconSrc}' alt='${item.iconAlt}'>
              </div>
              <div class='planning__swiper-slide-item-title'>
                <span>${item.title}</span>
              </div>
            </div>
            <div class='planning__swiper-slide-item-description'>
              ${isLink ? `<a href='#' class='planning__swiper-slide-item-description-link'>${item.description}</a>` : `<span>${item.description}</span>`}
            </div>
          </li>
        `));
      });

      slide.append(listContainer);

      slide.append($(`
        <div class='planning__swiper-slide-item-price-container'>
          <span class='planning__swiper-slide-item-price-description'>Від</span>
          <span class='planning__swiper-slide-item-price-number'>${apartment.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
          <span class='planning__swiper-slide-item-price-currency'>грн</span>
        </div>
        <div class='planning__swiper-slide-buttons-container'>
          <div class='planning__swiper-slide-button button button--full-width'>
            <a href='#location-screen' class='button__link'>Замовити дзвінок
              <img src='src/images/icons/phone-white-icon.svg' alt='phone ring'>
            </a>
          </div>
          <div class='planning__swiper-slide-button button-transparent button--full-width'>
            <a href='src/files/presentation.pdf' download='presentation' class='button-transparent__link button-transparent__link--gray'>Завантажити в PDF
              <img src='src/images/icons/download-gray-icon.svg' alt='right arrow'>
            </a>
          </div>
        </div>
      `));

      $swiperWrapper.append(slide);
    });
  } else {
    const slide = $(`
      <div class='planning__swiper-slide-empty'>
        <div class='planning__swiper-slide-empty-title'>
          <h4>Наразі, таких квартир немає</h4>
        </div>
      </div>
    `);

    $swiperWrapper.append(slide);
  }

  planningSwiper = new Swiper('.planning__swiper', planningSwiperSettings);
}

$(document).ready(function () {
  createApartmentsList();
  addApartmentsList(apartmentsList);

  $('.planning__filter-building-button').on('click', function () {
    $(this).toggleClass('planning__filter-button-building--active');
    filterApartmentsList(apartmentsList);
  });

  $('.planning__filter-section-button').on('click', function () {
    $(this).toggleClass('planning__filter-button-section--active');
    filterApartmentsList(apartmentsList);
  });

  function disableScroll() {
    $('body').css({ 'overflow-y': 'hidden' });
  }

  $('.planning__popup-cancel-button').click(function (event) {
    event.preventDefault();
    $.fancybox.close();
  });

  $('.planning__popup').fancybox({
    autoSize: false,
    autoResize: false,
    padding: 0,
    fitToView: false,
    closeClick: false,
    openEffect: 'none',
    closeEffect: 'none',
    beforeShow: disableScroll,
    smallBtn: false,
    toolbar: false,
    scrolling: 'hidden',
    helpers: {
      overlay: {
        locked: true,
      },
    },
  });

  $('.planning__swiper-slide-item-description-link').on('click', function () {
    event.preventDefault();
    $('.planning__popup').trigger('click');
  });
});
