const errorText = {
  name: {
    required: 'Вкажіть своє імʼя, будь ласка',
    chars: 'Імʼя може містити лише літери',
    minlength: 'Імʼя повинно бути не коротшим, ніж 2 символи',
    maxlength: 'Імʼя не повинно бути довшим, ніж 30 символів',
  },
  phone: {
    required: 'Вкажіть свій номер, будь ласка',
    length: 'Вкажіть коректний номер телефону, будь ласка',
  },
  message: {
    maxlength: 'Повідомлення повинно бути до 150 символів',
  },
};

function disableScroll() {
  $('body').addClass('page__container-scroll--disable');
}

function clearForm() {
  $('.location__form')[0].reset();
  $('body').removeClass('page__container-scroll--disable');
}

$(document).ready(function () {
  $('.location__form-popup-button').click(function (event) {
    event.preventDefault();
    $.fancybox.close();
  });

  $('.location__form-popup').fancybox({
    autoSize: false,
    autoResize: false,
    padding: 0,
    fitToView: false,
    closeClick: false,
    openEffect: 'none',
    closeEffect: 'none',
    beforeShow: disableScroll,
    afterClose: clearForm,
    smallBtn: false,
    toolbar: false,
    scrolling: 'hidden',
    helpers: {
      overlay: {
        locked: true,
      },
    },
  });

  $('#phone').mask('(00) 00 00 000');

  $.validator.addMethod('alphabetic', function (value, element) {
    return this.optional(element) || /^[a-zA-Zа-яА-Я\s]+$/.test(value);
  }, errorText.name.chars);

  $('#form')
    .submit(function (e) {
      e.preventDefault();
    })
    .validate({
      errorElement: 'span',
      rules: {
        name: {
          required: true,
          minlength: 2,
          maxlength: 30,
          alphabetic: true,
        },
        phone: {
          required: true,
          minlength: 14,
          maxlength: 14,
        },
        message: {
          maxlength: 150,
        },
      },
      messages: {
        name: {
          required: errorText.name.required,
          minlength: errorText.name.minlength,
          maxlength: errorText.name.maxlength,
        },
        phone: {
          required: errorText.phone.required,
          minlength: errorText.phone.length,
          maxlength: errorText.phone.length,
        },
        message: {
          maxlength: errorText.message.maxlength,
        },
      },

      highlight: function (element) {
        $(element)
          .closest('.location__form-input-label-container')
          .find('.location__form-input-error')
          .removeClass('location__form-has-error')
          .addClass('location__form-has-success');
      },

      unhighlight: function (element) {
        $(element)
          .closest('.location__form-input-label-container')
          .find('.location__form-input-error')
          .removeClass('location__form-has-success')
          .addClass('location__form-has-error');
      },

      submitHandler: function () {
        event.preventDefault();
        $('.location__form-popup').trigger('click');
      },
    });
});
