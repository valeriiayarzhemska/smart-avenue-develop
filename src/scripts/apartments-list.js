$(document).ready(function () {
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

  async function createApartmentsList() {
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

  async function addApartmentsList() {
    await createApartmentsList();

    const $swiperWrapper = $('.planning__swiper-wrapper');

    console.log(apartmentsList[0].name);

    apartmentsList.forEach((apartment) => {
      console.log(apartment);
      let slide = $("<div class='swiper-slide planning__swiper-slide'>")
        .append(
          $("<div class='planning__swiper-slide-image-container'>").append(
            $("<img src='" + apartment.image + "' alt='building'>")
          )
        )
        .append(
          $("<div class='planning__swiper-slide-title'>").append(
            $('<h4>').text(apartment.number + 'C' + apartment.square + 'K')
          )
        );

      let listContainer = $(
        "<div class='planning__swiper-slide-list-container'>"
      ).append($("<ul class='planning__swiper-slide-list'>"));

      const items = [
        {
          iconSrc: 'src/images/icons/home-icon.svg',
          iconAlt: 'building',
          title: 'Тип квартири',
          description: apartment.type,
        },
        {
          iconSrc: 'src/images/icons/square-icon.svg',
          iconAlt: 'building',
          title: 'Заг. площа',
          description: apartment.square + ' м.кв',
        },
        {
          iconSrc: 'src/images/icons/plan-icon.svg',
          iconAlt: 'building',
          title: 'План поверху',
          description: 'Відкрити',
        },
      ];

      items.forEach((item) => {
        listContainer.find('.planning__swiper-slide-list').append(
          $("<li class='planning__swiper-slide-item'>")
            .append(
              $(
                "<div class='planning__swiper-slide-item-title-container'>"
              ).append(
                $(
                  "<div class='planning__swiper-slide-item-icon-container'>"
                ).append(
                  $(
                    "<img src='" +
                      item.iconSrc +
                      "' alt='" +
                      item.iconAlt +
                      "'>"
                  )
                ),
                $("<div class='planning__swiper-slide-item-title'>").append(
                  $('<span>').text(item.title)
                )
              )
            )
            .append(
              $("<div class='planning__swiper-slide-item-description'>").append(
                $('<span>').text(item.description)
              )
            )
        );
      });

      slide.append(listContainer);

      slide
        .append(
          $("<div class='planning__swiper-slide-item-price-container'>").append(
            $(
              "<span class='planning__swiper-slide-item-price-description'>"
            ).text('Від'),
            $("<span class='planning__swiper-slide-item-price-number'>").text(
              `${apartment.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
            ),
            $("<span class='planning__swiper-slide-item-price-currency'>").text(
              'грн'
            )
          )
        )
        .append(
          $("<div class='planning__swiper-slide-buttons-container'>").append(
            $(
              "<div class='planning__swiper-slide-button button button--full-width'>"
            ).append(
              $("<a href='#location-screen' class='button__link'>").append(
                'Замовити дзвінок',
                $(
                  "<img src='src/images/icons/phone-white-icon.svg' alt='phone ring'>"
                )
              )
            ),
            $(
              "<div class='planning__swiper-slide-button button-transparent button--full-width'>"
            ).append(
              $(
                "<a href='src/files/presentation.pdf' download='presentation' class='button-transparent__link button-transparent__link--gray'>"
              ).append(
                'Завантажити в PDF',
                $(
                  "<img src='src/images/icons/download-gray-icon.svg' alt='right arrow'>"
                )
              )
            )
          )
        );

      $swiperWrapper.append(slide);
    });
  }

  addApartmentsList();
});
